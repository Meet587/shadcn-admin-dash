import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import ProjectRepository, { IProjectList } from '@/repositories/project.action';
import { ColumnDef } from '@tanstack/react-table';
import { EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import LocationCell from '../../components/LocationCell';

// Actions component to handle the action buttons
const ActionsCell = ({
  project,
  onRefresh,
}: {
  project: IProjectList;
  onRefresh: () => Promise<void>;
}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await ProjectRepository.deleteProject(project.id.toString());
      toast.success('Project deleted successfully');
      // Refresh table data after successful deletion
      await onRefresh();
    } catch (error) {
      toast.error(`Failed to delete project. Feature added soon.`);
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate(`/projects/edit/${project.id}`)}
        title="Edit project"
      >
        <PencilIcon className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate(`/projects/view/${project.id}`)}
        title="View project details"
      >
        <EyeIcon className="h-4 w-4" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="icon" title="Delete project">
            <TrashIcon className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project "{project.name}" and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export const createColumns = (
  onRefresh: () => Promise<void>,
): ColumnDef<IProjectList>[] => [
  {
    id: 'row_number',
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
    accessorKey: 'builder.id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Developer" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[100px]">{row.original.builder.name}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'city_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      return <LocationCell cityIds={row.original.cities} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'property_types',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property Type" />
    ),
    cell: ({ row }) => {
      const propertyType = row.getValue('property_types') as string[];

      // Handle null/undefined values gracefully
      if (!propertyType) {
        return (
          <div className="min-w-[80px] text-muted-foreground">
            Not specified
          </div>
        );
      }
      // Format text: capitalize and replace underscores with spaces
      const formattedType = propertyType
        .map((type) => type.toLowerCase().split('_').join(' '))
        .join(', ');

      return <div className="min-w-[80px]">{formattedType}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'possession_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Possession Date" />
    ),
    cell: ({ row }) => {
      const possessionMonth = row.original.possession_month;
      const possessionYear = row.original.possession_year;

      // Handle null values by displaying "TBD" or appropriate placeholder
      if (!possessionYear) {
        return <div className="min-w-[100px] text-muted-foreground">TBD</div>;
      }

      // Create logic to combine possession_month and possession_year into readable format
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      // Format date as "Month Year" (e.g., "March 2025")
      const monthName = possessionMonth
        ? monthNames[possessionMonth - 1]
        : monthNames[11];
      const formattedDate = `${monthName} ${possessionYear}`;

      return <div className="min-w-[100px]">{formattedDate}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => (
      <ActionsCell project={row.original} onRefresh={onRefresh} />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

// Export the columns function with a no-op refresh function as fallback
export const columns = createColumns(async () => {
  console.log('Table refresh requested');
});
