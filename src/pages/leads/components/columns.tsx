import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Button } from '@/components/ui/button';
import { ILead } from '@/repositories/lead.action';
import { ColumnDef } from '@tanstack/react-table';
import { EyeIcon } from 'lucide-react';

export const columns: ColumnDef<ILead>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="No."
        className="text-center"
      />
    ),
    cell: ({ row }) => (
      <div className="w-[40px] text-center">{row.index + 1}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'first_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const firstName = row.getValue('first_name');
      const lastName = row.original.last_name;
      return <div className="min-w-[80px]">{firstName + ' ' + lastName}</div>;
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      return <div className="min-w-[80px]">{row.getValue('phone')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.getValue('email')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'source',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Source" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.getValue('source')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.getValue('status')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'interested_property',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Interested Property" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[80px]">{row.getValue('interested_property')}</div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Inquery Date" />
    ),
    cell: ({ row }) => {
      const formattedDate = row.getValue('created_at')
        ? new Date(row.getValue('created_at')).toLocaleDateString()
        : '';
      return <div className="w-[80px]">{formattedDate}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) => {
      const formattedDate = row.getValue('updated_at')
        ? new Date(row.getValue('updated_at')).toLocaleDateString()
        : '';
      return <div className="w-[80px]">{formattedDate}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: () => {
      return (
        <div className="w-[80px]">
          <Button variant="outline" size="icon">
            <EyeIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
