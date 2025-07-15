import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { IUser } from '@/repositories/users.action';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<IUser>[] = [
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
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return <div className="min-w-[80px]">{row.getValue('email')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'first_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.getValue('first_name')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'last_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => {
      return <div className="min-w-[80px]">{row.getValue('last_name')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.getValue('phone')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
];
