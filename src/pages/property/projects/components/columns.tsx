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
import ProjectRepository, { IProject } from '@/repositories/project.action';
import { RootState } from '@/store/store';
import { ColumnDef } from '@tanstack/react-table';
import { EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

// Actions component to handle the action buttons
const ActionsCell = ({
  project,
  onRefresh,
}: {
  project: IProject;
  onRefresh: () => Promise<void>;
}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await ProjectRepository.deleteProject(project.id);
      toast.success('Project deleted successfully');
      // Refresh table data after successful deletion
      await onRefresh();
    } catch (error) {
      toast.error('Failed to delete project');
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

// Developer cell component
const DeveloperCell = ({ builderId }: { builderId: number }) => {
  const developers = useSelector(
    (state: RootState) => state.developer.developers,
  );

  // Handle loading state while builders data is being fetched
  if (developers.length === 0) {
    return (
      <div className="min-w-[100px] flex items-center">
        <div className="h-4 w-20 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  // Find the builder by ID (convert builderId to string for comparison)
  const builder = developers.find((d) => d.id === builderId.toString());

  // Add fallback display for missing or unknown builders
  if (!builder) {
    return (
      <div className="min-w-[100px] text-muted-foreground">
        Unknown Developer
      </div>
    );
  }

  return <div className="min-w-[100px]">{builder.name}</div>;
};

// Location cell component
const LocationCell = ({ cityIds }: { cityIds: string[] }) => {
  const locationsArray = useSelector(
    (state: RootState) => state.locations.locations,
  );

  // Handle empty or invalid city IDs gracefully
  if (!cityIds || cityIds.length === 0) {
    return (
      <div className="min-w-[120px] text-muted-foreground">
        Location not specified
      </div>
    );
  }

  // Handle loading state while locations data is being fetched
  if (locationsArray.length === 0) {
    return (
      <div className="min-w-[120px] flex items-center">
        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  // Resolve city_id array to city names using Redux store
  const resolvedCities = locationsArray.filter((location) =>
    cityIds.includes(location.id.toString()),
  );

  // Handle case where no cities are found
  if (resolvedCities.length === 0) {
    return (
      <div className="min-w-[120px] text-muted-foreground">
        Cities not found
      </div>
    );
  }

  // Format multiple cities as comma-separated list with truncation for long lists
  const cityNames = resolvedCities.map((city) => city.name);

  // Show first 2 cities, then "+ X more" if more than 2
  if (cityNames.length <= 2) {
    return <div className="min-w-[120px]">{cityNames.join(', ')}</div>;
  } else {
    const displayCities = cityNames.slice(0, 2).join(', ');
    const remainingCount = cityNames.length - 2;
    return (
      <div className="min-w-[120px]" title={cityNames.join(', ')}>
        {displayCities} + {remainingCount} more
      </div>
    );
  }
};

export const createColumns = (
  onRefresh: () => Promise<void>,
): ColumnDef<IProject>[] => [
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
    accessorKey: 'builder_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Developer" />
    ),
    cell: ({ row }) => <DeveloperCell builderId={row.original.builder_id} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'city_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => <LocationCell cityIds={row.original.city_id} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'construction_type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property Type" />
    ),
    cell: ({ row }) => {
      const constructionType = row.getValue('construction_type') as string;

      // Handle null/undefined values gracefully
      if (!constructionType) {
        return (
          <div className="min-w-[80px] text-muted-foreground">
            Not specified
          </div>
        );
      }

      // Format text: capitalize and replace underscores with spaces
      const formattedType = constructionType
        .toLowerCase()
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return <div className="min-w-[80px]">{formattedType}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'possession_year',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Launch Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('possession_year'));
      return <div className="min-w-[80px]">{date.toLocaleDateString()}</div>;
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
      if (!possessionMonth || !possessionYear) {
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
      const monthName = monthNames[possessionMonth - 1]; // Month is 1-indexed
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

// Export the columns function for backward compatibility
export const columns = createColumns(async () => {
  window.location.reload();
});
