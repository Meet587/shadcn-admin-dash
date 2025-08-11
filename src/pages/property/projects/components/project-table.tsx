import { DataTable } from '@/components/data-table/data-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import TopLoadingBar from '../../../../components/top-loading-bar';
import BuilderRepository from '../../../../repositories/builders.action';
import { LocationRepository } from '../../../../repositories/locations.action';
import ProjectRepository, {
  IProjectList,
  IProjectListFilters,
} from '../../../../repositories/project.action';
import { _setDeveloperList } from '../../../../store/developer/action';
import { _setLocationsList } from '../../../../store/locations/action';
import { _setProjectList } from '../../../../store/projects/action';
import { RootState } from '../../../../store/store';
import { createColumns } from './columns';
import { DataTableToolbar } from './data-table-toolbar';

const ProjectsTable = () => {
  const [projectsList, setProjectsList] = useState<IProjectList[]>([]);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<IProjectListFilters>({
    page: 1,
    limit: 10,
    name: '',
    is_ready_possession: undefined,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [buildersLoading, setBuildersLoading] = useState<boolean>(false);
  const [locationsLoading, setLocationsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const prevFiltersRef = useRef<IProjectListFilters>({
    page: 1,
    limit: 10,
    name: '',
    is_ready_possession: undefined,
  });

  const developers = useSelector(
    (state: RootState) => state.developer.developers,
  );
  const locations = useSelector(
    (state: RootState) => state.locations.locations,
  );

  const fetchRequiredData = useCallback(
    async (currentFilters: IProjectListFilters, isRetry = false) => {
      try {
        if (isRetry) {
          setIsRetrying(true);
        } else {
          setIsLoading(true);
        }

        const projectsData = await ProjectRepository.fetchProjectList(
          currentFilters,
        );

        setProjectsList(projectsData.data);
        setPaginationInfo({
          total: projectsData.total,
          page: projectsData.page,
          limit: projectsData.limit,
          totalPages: projectsData.totalPages,
        });
        dispatch(_setProjectList(projectsData));

        if (developers.length === 0 && !buildersLoading) {
          setBuildersLoading(true);
          try {
            const buildersData = await BuilderRepository.fetchBuilderList();
            dispatch(_setDeveloperList(buildersData));
          } catch (error) {
            console.error('Failed to fetch builders:', error);
            toast.error('Failed to load developer information', {
              description: 'Some developer names may not display correctly',
            });
          } finally {
            setBuildersLoading(false);
          }
        }

        // Fetch locations data if not already loaded
        if (locations.length === 0 && !locationsLoading) {
          setLocationsLoading(true);
          try {
            const locationsData = await LocationRepository.fetchLocations();
            dispatch(_setLocationsList(locationsData));
          } catch (error) {
            console.error('Failed to fetch locations:', error);
            toast.error('Failed to load location information', {
              description: 'Some location names may not display correctly',
            });
          } finally {
            setLocationsLoading(false);
          }
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);

        if (!isRetry) {
          toast.error('Failed to fetch data', {
            description: 'Please check your connection and try again',
          });
        }
        throw error; // Re-throw to handle in the calling function if needed
      } finally {
        setIsLoading(false);
        setIsRetrying(false);
      }
    },
    [
      dispatch,
      developers.length,
      locations.length,
      buildersLoading,
      locationsLoading,
    ],
  );

  // Fetch data when filters change
  useEffect(() => {
    const filtersChanged =
      !prevFiltersRef.current ||
      JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters);

    if (filtersChanged) {
      fetchRequiredData(filters);
      prevFiltersRef.current = { ...filters };
    }
  }, [filters, fetchRequiredData]);

  const refreshTableData = useCallback(async () => {
    await fetchRequiredData(filters);
  }, [fetchRequiredData, filters]);

  const handleFiltersChange = useCallback(
    (newFilters: Partial<IProjectListFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
    },
    [],
  );

  // Handle pagination changes
  const handlePaginationChange = useCallback((page: number, limit?: number) => {
    setFilters((prev) => ({ ...prev, page, ...(limit && { limit }) }));
  }, []);

  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => createColumns(refreshTableData),
    [refreshTableData],
  );

  const table = useReactTable({
    data: projectsList,
    columns,
    state: {
      pagination: {
        pageIndex: paginationInfo.page - 1,
        pageSize: paginationInfo.limit,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    // Server-side pagination
    manualPagination: true,
    pageCount: paginationInfo.totalPages,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === 'function'
          ? updater({
              pageIndex: paginationInfo.page - 1,
              pageSize: paginationInfo.limit,
            })
          : updater;
      handlePaginationChange(
        newPagination.pageIndex + 1,
        newPagination.pageSize,
      );
    },
  });

  // Implement proper loading states coordination
  const hasAnyLoading =
    isLoading || isRetrying || buildersLoading || locationsLoading;

  return (
    <div>
      {/* Show top loading bar during retry or any background loading */}
      <TopLoadingBar loading={hasAnyLoading} />
      <DataTable
        columns={createColumns(refreshTableData)}
        toolbar={
          <DataTableToolbar
            table={table}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        }
        table={table}
      />
    </div>
  );
};

export default ProjectsTable;
