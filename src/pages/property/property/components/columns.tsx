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
import PropertyRepository, { IProperty } from '@/repositories/property.action';
import { ColumnDef } from '@tanstack/react-table';
import { EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import LocationCell from '../../components/LocationCell';

const ActionsCell = ({
  property,
  onRefresh,
}: {
  property: IProperty;
  onRefresh: () => Promise<void>;
}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await PropertyRepository.deleteProperty(property.id);
      toast.success('Property deleted successfully');
      // Refresh table data after successful deletion
      await onRefresh();
    } catch (error) {
      toast.error(`Failed to delete property. Feature added soon.`);
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate(`/property/edit/${property.id}`)}
        title="Edit property"
      >
        <PencilIcon className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate(`/property/view/${property.id}`)}
        title="View property details"
      >
        <EyeIcon className="h-4 w-4" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="icon" title="Delete property">
            <TrashIcon className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              property "{property.title}" and remove all associated data.
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
): ColumnDef<IProperty>[] => [
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
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return <div className="min-w-[80px]">{row.getValue('title')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'property_sub_type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property Type" />
    ),
    cell: ({ row }) => {
      const propertyType = row.getValue('property_sub_type') as string;

      if (!propertyType) {
        return (
          <div className="min-w-[80px] text-muted-foreground">
            Not specified
          </div>
        );
      }
      return <div className="min-w-[80px]">{propertyType}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'bhk',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="BHK" />
    ),
    cell: ({ row }) => {
      return <div className="min-w-[60px]">{row.getValue('bhk')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'furnishing',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Furnishing" />
    ),
    cell: ({ row }) => {
      return <div className="w-[100px]">{row.getValue('furnishing')}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'pricing.total_amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="min-w-[80px]">
          {Number(row.original.pricing.total_amount).toFixed(0)}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'locations',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      return <LocationCell cityIds={row.original.locations} />;
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
      <ActionsCell property={row.original} onRefresh={onRefresh} />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export const columns = createColumns(async () => {
  console.log('Table refresh requested');
});
