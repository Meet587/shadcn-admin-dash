import { IPropertyListFilters } from '@/repositories/property.action';
import PropertyFilters from './PropertyFilters';

interface DataTableToolbarProps {
  handleFilterChange?: (filters: IPropertyListFilters) => void;
}

export function DataTableToolbar({
  handleFilterChange,
}: DataTableToolbarProps) {
  // const [searchValue, setSearchValue] = useState(filters?.name || '');

  // const searchTimeoutRef = useRef<number>(1);

  // Handle search with debounce
  // useEffect(() => {
  //   if (searchTimeoutRef.current !== undefined) {
  //     window.clearTimeout(searchTimeoutRef.current);
  //   }

  //   searchTimeoutRef.current = window.setTimeout(() => {
  //     handleFilterChange?.({});
  //   }, 1);

  //   return () => {
  //     if (searchTimeoutRef.current !== undefined) {
  //       window.clearTimeout(searchTimeoutRef.current);
  //     }
  //   };
  // }, [handleFilterChange]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2"></div>
        {/* <DataTableViewOptions table={table} /> */}
        <PropertyFilters handleFilterChange={handleFilterChange} />
      </div>
    </>
  );
}
