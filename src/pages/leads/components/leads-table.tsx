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
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import TopLoadingBar from '../../../components/top-loading-bar';
import { ILead, LeadRepository } from '../../../repositories/lead.action';
import { _setLeadsList } from '../../../store/leads/action';
import { columns } from './columns';

const LeadsTable = () => {
  const [leadsList, setLeadsList] = useState<ILead[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const response = await LeadRepository.fetchLeadsList();
      setLeadsList(response.data);
      dispatch(_setLeadsList(response.data));
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch leads', {
        description: 'Please try again later',
      });
    } finally {
      setIsLoading(false);
    }
  };
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: leadsList,
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
        // toolbar={<DataTableToolbar table={table} />}
        table={table}
      />
    </div>
  );
};

export default LeadsTable;
