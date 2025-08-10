import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import z from 'zod';
import { SelectDropdown } from '../../../../components/select-dropdown';
import PropertyRepository, {
  PropertyStatusEnum,
  PropertyTypeEnum,
  SizeUnitEnum,
} from '../../../../repositories/property.action';
import { RootState } from '../../../../store/store';

export function PrimaryButtons() {
  const addPropertySchema = z.object({
    property_number: z.string().min(1),
    property_type: z.nativeEnum(PropertyTypeEnum),
    size: z.number().min(1),
    size_unit: z.nativeEnum(SizeUnitEnum),
    bedrooms: z.number().min(1),
    bathrooms: z.number().min(1),
    project_id: z.string().min(1),
    floor_number: z.number().min(1),
    price: z.number().min(1),
    status: z.nativeEnum(PropertyStatusEnum),
  });

  const form = useForm({
    resolver: zodResolver(addPropertySchema),
    defaultValues: {
      property_number: '',
      property_type: PropertyTypeEnum.FLAT,
      size: 0,
      size_unit: SizeUnitEnum.SQFT,
      bedrooms: 0,
      bathrooms: 0,
      project_id: '',
      floor_number: 0,
      price: 0,
      status: PropertyStatusEnum.AVAILABLE,
    },
  });

  const handleSubmit = async (values: z.infer<typeof addPropertySchema>) => {
    try {
      const res = await PropertyRepository.addNewProperty(values);
      console.log(res);
      toast.success('Property added successfully');
    } catch (error) {
      toast.error('Failed to add property', {
        description: error as string,
      });
    }
  };

  const projects = useSelector(
    (state: RootState) => state.project.projects.data,
  );

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger
          className="flex items-center gap-2"
          role="button"
          asChild
        >
          <Button>
            <span>Create</span> <PlusIcon size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new property</DialogTitle>
          </DialogHeader>
          <div className="-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 p-0.5"
              >
                <FormField
                  control={form.control}
                  name="property_number"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Property Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="col-span-4"
                          placeholder="Enter property number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="property_type"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Property Type
                      </FormLabel>
                      <FormControl>
                        <SelectDropdown
                          defaultValue={field.value ?? PropertyTypeEnum.FLAT}
                          onValueChange={(value) =>
                            field.onChange(value as PropertyTypeEnum)
                          }
                          placeholder="Select Property Type"
                          className="col-span-4"
                          items={Object.values(PropertyTypeEnum).map((c) => ({
                            label: c,
                            value: c,
                          }))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Size
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter size"
                          className="col-span-4"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size_unit"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Size Unit
                      </FormLabel>
                      <SelectDropdown
                        defaultValue={field.value ?? SizeUnitEnum.SQFT}
                        onValueChange={(value) =>
                          field.onChange(value as SizeUnitEnum)
                        }
                        placeholder="Select Size Unit"
                        className="col-span-4"
                        items={Object.values(SizeUnitEnum).map((c) => ({
                          label: c,
                          value: c,
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Bedrooms
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter bedrooms"
                          className="col-span-4"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Bathrooms
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter bathrooms"
                          className="col-span-4"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="project_id"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Project
                      </FormLabel>
                      <FormControl>
                        <SelectDropdown
                          defaultValue={field.value ?? projects[0]?.id ?? ''}
                          onValueChange={(value) =>
                            field.onChange(value as string)
                          }
                          placeholder="Select Project"
                          className="col-span-4"
                          items={projects.map((project) => ({
                            label: project.name,
                            value: project.id.toString(),
                          }))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="floor_number"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Floor Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter floor number"
                          className="col-span-4"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
