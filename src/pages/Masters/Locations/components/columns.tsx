import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { EyeIcon } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { ILocation } from '../../../../repositories/locations.action';

export const columns: ColumnDef<ILocation>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="No."
        className="text-center"
      />
    ),
    cell: ({ row }) => <div className=" text-center">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return <div className="min-w-[80px]">{row.getValue('name')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'state',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="State" />
    ),
    cell: ({ row }) => {
      return <div className="min-w-[80px]">{row.getValue('state')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'country',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.getValue('country')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'pincode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pincode" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.getValue('pincode')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'created_at',
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
