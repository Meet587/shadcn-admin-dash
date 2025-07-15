import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { IBuilder } from '@/repositories/builders.action';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<IBuilder>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Developer Name" />
    ),
    cell: ({ row }) => {
      return <div className="min-w-[80px]">{row.getValue('name')}</div>;
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
];
