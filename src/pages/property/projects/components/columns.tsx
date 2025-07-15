import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { IProject } from '@/repositories/project.action';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<IProject>[] = [
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
      <DataTableColumnHeader column={column} title="Project Name" />
    ),
    cell: ({ row }) => {
      return <div className="min-w-[80px]">{row.getValue('name')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'city.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
    cell: ({ row }) => {
      const city = row.original.city;
      const state = row.original.city.state;
      return <div className="min-w-[80px]">{city.name + ', ' + state}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'project_type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Type" />
    ),
    cell: ({ row }) => {
      return <div className="min-w-[80px]">{row.getValue('project_type')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'launch_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Launch Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('launch_date'));
      return <div className="min-w-[80px]">{date.toLocaleDateString()}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'possession_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Possession Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('possession_date'));
      return <div className="min-w-[80px]">{date.toLocaleDateString()}</div>;
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
