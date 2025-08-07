import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface TableErrorStateProps {
  onRetry: () => void;
  error?: string;
  columns?: number;
}

export const TableErrorState = ({
  onRetry,
  error = 'Failed to load data',
  columns = 8,
}: TableErrorStateProps) => {
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
                  <AlertCircle className="h-12 w-12 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {error}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Please check your connection and try again
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRetry}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
