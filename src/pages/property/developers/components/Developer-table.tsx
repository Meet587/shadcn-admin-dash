import { DataTable } from '@/components/data-table/data-table';
import BuilderRepository, { IBuilder } from '@/repositories/builders.action';
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
import { useEffect, useState } from 'react';
import TopLoadingBar from '../../../../components/top-loading-bar';
import { columns } from './columns';
import { DataTableToolbar } from './data-table-toolbar';

const DeveloperTable = () => {
  const [developerList, setDeveloperList] = useState<IBuilder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      setIsLoading(true);
      const response = await BuilderRepository.fetchBuilderList();
      setDeveloperList(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: developerList,
    columns,
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

  if (isLoading) {
    return <TopLoadingBar loading={isLoading} />;
  }

  return (
    <div>
      <DataTable
        columns={columns}
        toolbar={<DataTableToolbar table={table} />}
        table={table}
      />
    </div>
  );
};

export default DeveloperTable;
