import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { IProperty } from '@/repositories/property.action';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<IProperty>[] = [
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
    accessorKey: 'property_number',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property Number" />
    ),
    cell: ({ row }) => {
      return <div className="min-w-[80px]">{row.getValue('property_number')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'property_type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property Type" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.getValue('property_type')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'size',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: ({ row }) => {
      return <div className="min-w-[80px]">{row.getValue('size')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'size_unit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size Unit" />
    ),
    cell: ({ row }) => {
    return <div className="w-[80px]">{row.getValue('size_unit')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
];
