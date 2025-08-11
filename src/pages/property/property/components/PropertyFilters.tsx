import { SelectDropdown } from '@/components/select-dropdown';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  PropertySubtypeEnum,
  PropertyTypeEnum,
} from '@/repositories/project.action';
import {
  FurnishingEnum,
  IPropertyListFilters,
  ListingForEnum,
} from '@/repositories/property.action';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilterIcon, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';

interface DataTableFiltersProps {
  handleFilterChange?: (newFilters: Partial<IPropertyListFilters>) => void;
}

export default function PropertyFilters({
  handleFilterChange,
}: DataTableFiltersProps) {
  const PropertyFilterSchema = z.object({
    propertyType: z.nativeEnum(PropertyTypeEnum).optional(),
    propertySubType: z.nativeEnum(PropertySubtypeEnum).optional(),
    listingFor: z.nativeEnum(ListingForEnum).optional(),
    bhk: z.number().optional(),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
    furnishing: z.nativeEnum(FurnishingEnum).optional(),
  });
  const form = useForm({
    resolver: zodResolver(PropertyFilterSchema),
    defaultValues: {
      propertyType: undefined,
      propertySubType: undefined,
      listingFor: undefined,
      furnishing: undefined,
      bhk: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    },
  });

  const handleSubmit = async (values: z.infer<typeof PropertyFilterSchema>) => {
    handleFilterChange?.(values as Partial<IPropertyListFilters>);
  };

  const handleResetFilters = () => {
    form.reset();
    handleFilterChange?.({});
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Property Filters</SheetTitle>
          <Separator className="my-2" />
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-2 p-4"
          >
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Property Type
                  </FormLabel>
                  <FormControl>
                    <SelectDropdown
                      {...field}
                      items={Object.values(PropertyTypeEnum).map((type) => ({
                        label: type,
                        value: type,
                      }))}
                      isControlled={true}
                      defaultValue={field.value || ''}
                      onValueChange={field.onChange}
                      placeholder="Select Property Type"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="propertySubType"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Property Type
                  </FormLabel>
                  <FormControl>
                    <SelectDropdown
                      {...field}
                      items={Object.values(PropertySubtypeEnum).map((type) => ({
                        label: type,
                        value: type,
                      }))}
                      isControlled={true}
                      defaultValue={field.value || ''}
                      onValueChange={field.onChange}
                      placeholder="Select Property Sub Type"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="listingFor"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Listing For
                  </FormLabel>
                  <FormControl>
                    <SelectDropdown
                      {...field}
                      items={Object.values(ListingForEnum).map((type) => ({
                        label: type,
                        value: type,
                      }))}
                      isControlled={true}
                      defaultValue={field.value || ''}
                      onValueChange={field.onChange}
                      placeholder="Select Listing For"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="furnishing"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Furnishing
                  </FormLabel>
                  <FormControl>
                    <SelectDropdown
                      {...field}
                      items={Object.values(FurnishingEnum).map((type) => ({
                        label: type,
                        value: type,
                      }))}
                      isControlled={true}
                      defaultValue={field.value || ''}
                      onValueChange={field.onChange}
                      placeholder="Select Furnishing"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bhk"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                  <FormLabel className="col-span-2 text-right">BHK</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="number"
                      className="col-span-4"
                      placeholder="Enter BHK"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minPrice"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Min Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="number"
                      className="col-span-4"
                      placeholder="Enter Min Price"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxPrice"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                  <FormLabel className="col-span-2 text-right">
                    Max Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="number"
                      className="col-span-4"
                      placeholder="Enter Max Price"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Button type="submit">Apply</Button>
              <Button
                variant="outline"
                onClick={handleResetFilters}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <X className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
