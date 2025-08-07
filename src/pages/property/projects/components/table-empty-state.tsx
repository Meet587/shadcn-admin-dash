import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FolderOpen, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

interface TableEmptyStateProps {
  columns?: number;
  showAddButton?: boolean;
}

export const TableEmptyState = ({
  columns = 8,
  showAddButton = true,
}: TableEmptyStateProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, index) => (
                <TableHead key={index}>
                  <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={columns} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <FolderOpen className="h-12 w-12 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      No projects found
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Get started by creating your first project
                    </p>
                  </div>
                  {showAddButton && (
                    <Button
                      onClick={() => navigate('/projects/add')}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Project
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
