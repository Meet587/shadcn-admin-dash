import { DataTable } from '@/components/data-table/data-table';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import TopLoadingBar from '../../../../components/top-loading-bar';
import BuilderRepository from '../../../../repositories/builders.action';
import { LocationRepository } from '../../../../repositories/locations.action';
import ProjectRepository, {
  IProject,
} from '../../../../repositories/project.action';
import { _setDeveloperList } from '../../../../store/developer/action';
import { _setLocationsList } from '../../../../store/locations/action';
import { _setProjectList } from '../../../../store/projects/action';
import { RootState } from '../../../../store/store';
import { createColumns } from './columns';
import { DataTableToolbar } from './data-table-toolbar';
import { TableEmptyState } from './table-empty-state';
import { TableErrorState } from './table-error-state';
import { TableSkeleton } from './table-skeleton';

const ProjectsTable = () => {
  const [projectsList, setProjectsList] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [buildersLoading, setBuildersLoading] = useState<boolean>(false);
  const [locationsLoading, setLocationsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  // Get current state from Redux store
  const developers = useSelector(
    (state: RootState) => state.developer.developers,
  );
  const locations = useSelector(
    (state: RootState) => state.locations.locations,
  );

  const fetchRequiredData = useCallback(
    async (isRetry = false) => {
      try {
        if (isRetry) {
          setIsRetrying(true);
        } else {
          setIsLoading(true);
        }
        setError(null);

        // Fetch projects data first - this is the primary data
        const projectsData = await ProjectRepository.fetchProjectList();
        setProjectsList(projectsData);
        dispatch(_setProjectList(projectsData));

        // Fetch builders data if not already loaded - ensure builders data is loaded
        if (developers.length === 0) {
          setBuildersLoading(true);
          try {
            const buildersData = await BuilderRepository.fetchBuilderList();
            dispatch(_setDeveloperList(buildersData));
          } catch (error) {
            console.error('Failed to fetch builders:', error);
            // Add error handling for missing related data - don't fail the entire operation
            toast.error('Failed to load developer information', {
              description: 'Some developer names may not display correctly',
            });
          } finally {
            setBuildersLoading(false);
          }
        }

        // Fetch locations data if not already loaded - ensure locations data is loaded
        if (locations.length === 0) {
          setLocationsLoading(true);
          try {
            const locationsData = await LocationRepository.fetchLocations();
            dispatch(_setLocationsList(locationsData));
          } catch (error) {
            console.error('Failed to fetch locations:', error);
            // Add error handling for missing related data - don't fail the entire operation
            toast.error('Failed to load location information', {
              description: 'Some location names may not display correctly',
            });
          } finally {
            setLocationsLoading(false);
          }
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch projects';
        setError(errorMessage);

        if (!isRetry) {
          toast.error('Failed to fetch data', {
            description: 'Please check your connection and try again',
          });
        }
      } finally {
        setIsLoading(false);
        setIsRetrying(false);
      }
    },
    [developers.length, locations.length, dispatch],
  );

  useEffect(() => {
    fetchRequiredData();
  }, [fetchRequiredData]);

  // Add data refresh capability after operations
  const refreshTableData = useCallback(async () => {
    try {
      setError(null);
      const projectsData = await ProjectRepository.fetchProjectList();
      setProjectsList(projectsData);
      dispatch(_setProjectList(projectsData));

      // Also refresh related data if needed
      if (developers.length === 0 && !buildersLoading) {
        setBuildersLoading(true);
        try {
          const buildersData = await BuilderRepository.fetchBuilderList();
          dispatch(_setDeveloperList(buildersData));
        } catch (error) {
          console.error('Failed to refresh builders:', error);
        } finally {
          setBuildersLoading(false);
        }
      }

      if (locations.length === 0 && !locationsLoading) {
        setLocationsLoading(true);
        try {
          const locationsData = await LocationRepository.fetchLocations();
          dispatch(_setLocationsList(locationsData));
        } catch (error) {
          console.error('Failed to refresh locations:', error);
        } finally {
          setLocationsLoading(false);
        }
      }
    } catch (error) {
      console.error('Failed to refresh projects:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to refresh data';
      setError(errorMessage);
      toast.error('Failed to refresh data');
    }
  }, [
    developers.length,
    locations.length,
    buildersLoading,
    locationsLoading,
    dispatch,
  ]);

  // Retry function for error state
  const handleRetry = useCallback(() => {
    fetchRequiredData(true);
  }, [fetchRequiredData]);

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: projectsList,
    columns: createColumns(refreshTableData),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getSortedRowModel: getSortedRowModel(),
    // onRowSelectionChange: setRowSelection,
  });

  // Implement proper loading states coordination
  const isInitialLoading = isLoading && !isRetrying;
  const hasAnyLoading =
    isLoading || isRetrying || buildersLoading || locationsLoading;

  // Show skeleton loader during initial loading
  if (isInitialLoading) {
    return (
      <div>
        <TopLoadingBar loading={true} />
        <TableSkeleton rows={5} columns={8} />
      </div>
    );
  }

  // Show error state if there's an error
  if (error && !isLoading && !isRetrying) {
    return <TableErrorState onRetry={handleRetry} error={error} columns={8} />;
  }

  // Show empty state if no projects and not loading
  if (!isLoading && !error && projectsList.length === 0) {
    return <TableEmptyState columns={8} showAddButton={true} />;
  }

  return (
    <div>
      {/* Show top loading bar during retry or any background loading */}
      <TopLoadingBar loading={hasAnyLoading} />
      <DataTable
        columns={createColumns(refreshTableData)}
        toolbar={<DataTableToolbar table={table} />}
        table={table}
      />
    </div>
  );
};

export default ProjectsTable;
