import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { IProjectListFilters } from '../../../../repositories/project.action';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters?: IProjectListFilters;
  onFiltersChange?: (filters: Partial<IProjectListFilters>) => void;
}

export function DataTableToolbar<TData>({
  table,
  filters,
  onFiltersChange,
}: DataTableToolbarProps<TData>) {
  const [searchValue, setSearchValue] = useState(filters?.name || '');
  const [readyPossession, setReadyPossession] = useState<boolean | undefined>(
    filters?.is_ready_possession,
  );
  const searchTimeoutRef = useRef<number>(1);

  // Handle search with debounce
  useEffect(() => {
    if (searchTimeoutRef.current !== undefined) {
      window.clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = window.setTimeout(() => {
      onFiltersChange?.({ name: searchValue || undefined });
    }, 500);

    return () => {
      if (searchTimeoutRef.current !== undefined) {
        window.clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchValue, onFiltersChange]);

  const handleReadyPossessionChange = useCallback((value: string) => {
    const boolValue = value === 'true' ? true : value === 'false' ? false : undefined;
    setReadyPossession(boolValue);
    onFiltersChange?.({ is_ready_possession: boolValue });
  }, [onFiltersChange]);

  const handleReset = useCallback(() => {
    setSearchValue('');
    setReadyPossession(undefined);
    onFiltersChange?.({
      name: undefined,
      is_ready_possession: undefined,
    });
  }, [onFiltersChange]);

  const hasActiveFilters = searchValue || readyPossession !== undefined;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Filter projects by name..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <div className="flex gap-x-2">
          <Select
            value={readyPossession?.toString() || ''}
            onValueChange={handleReadyPossessionChange}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue placeholder="Ready Possession" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="true">Ready Possession</SelectItem>
              <SelectItem value="false">Under Construction</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={handleReset}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
