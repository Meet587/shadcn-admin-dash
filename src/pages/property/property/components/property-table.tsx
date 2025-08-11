import { DataTable } from '@/components/data-table/data-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import TopLoadingBar from '../../../../components/top-loading-bar';
import PropertyRepository, {
  IProperty,
  IPropertyListFilters,
} from '../../../../repositories/property.action';
import { _setPropertyList } from '../../../../store/property/action';
import { createColumns } from './columns';
import { DataTableToolbar } from './data-table-toolbar';

const PropertyTable = () => {
  const dispatch = useDispatch();
  const [propertyList, setPropertyList] = useState<IProperty[]>([]);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<IPropertyListFilters>({
    name: '',
    page: 1,
    limit: 10,
    propertyType: undefined,
    listingFor: undefined,
    furnishing: undefined,
    bhk: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    propertySubType: undefined,
  });

  const prevFiltersRef = useRef<IPropertyListFilters>({
    page: 1,
    limit: 10,
    name: '',
    propertyType: undefined,
    listingFor: undefined,
    furnishing: undefined,
    bhk: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    propertySubType: undefined,
  });

  const fetchProperties = useCallback(
    async (currentFilters: IPropertyListFilters) => {
      try {
        setIsLoading(true);
        const response = await PropertyRepository.fetchPropertyList(
          currentFilters,
        );
        setPropertyList(response.data);
        setPaginationInfo({
          total: response.total,
          page: response.page,
          limit: response.limit,
          totalPages: response.totalPages,
        });
        dispatch(_setPropertyList(response));
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch properties', {
          description: 'Please try again later',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  const refreshTableData = useCallback(async () => {
    await fetchProperties(filters);
  }, [fetchProperties, filters]);

  // Fetch data when filters change
  useEffect(() => {
    const filtersChanged =
      !prevFiltersRef.current ||
      JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters);

    if (filtersChanged) {
      fetchProperties(filters);
      prevFiltersRef.current = { ...filters };
    }
  }, [filters, fetchProperties]);

  const handlePaginationChange = useCallback((page: number, limit?: number) => {
    setPaginationInfo((prev) => ({ ...prev, page, ...(limit && { limit }) }));
  }, []);

  const handleFilterChange = useCallback(
    (newFilters: Partial<IPropertyListFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
    },
    [],
  );

  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => createColumns(refreshTableData),
    [refreshTableData],
  );

  const table = useReactTable({
    data: propertyList,
    columns,
    state: {
      pagination: {
        pageIndex: paginationInfo.page - 1,
        pageSize: paginationInfo.limit,
      },
    },
    getCoreRowModel: getCoreRowModel(),
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

  return (
    <div>
      <TopLoadingBar loading={isLoading} />
      <DataTable
        columns={columns}
        toolbar={
          <DataTableToolbar
            handleFilterChange={handleFilterChange}
          />
        }
        table={table}
      />
    </div>
  );
};

export default PropertyTable;
