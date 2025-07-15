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
import { useEffect, useState } from 'react';
import TopLoadingBar from '../../../../components/top-loading-bar';
import ProjectRepository, {
  IProject,
} from '../../../../repositories/project.action';
import { columns } from './columns';
import { DataTableToolbar } from './data-table-toolbar';

const ProjectsTable = () => {
  const [projectsList, setProjectsList] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await ProjectRepository.fetchProjectList();
      setProjectsList(response);
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
    data: projectsList,
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

export default ProjectsTable;
