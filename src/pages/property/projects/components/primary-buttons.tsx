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
import { RootState } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import z from 'zod';
import { SelectDropdown } from '../../../../components/select-dropdown';
import ProjectRepository, {
  ProjectStatusEnum,
  ProjectTypeEnum,
} from '../../../../repositories/project.action';

export function PrimaryButtons() {
  const addProjectSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    area: z.string().optional(),
    launch_date: z.string().optional(),
    possession_date: z.string().optional(),
    project_type: z.nativeEnum(ProjectTypeEnum),
    status: z.nativeEnum(ProjectStatusEnum),
    builder_id: z.string().min(1, 'Builder is required'),
    city_id: z.string().min(1, 'City is required'),
  });

  const form = useForm({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      area: '',
      launch_date: '',
      possession_date: '',
      project_type: ProjectTypeEnum.RESIDENTIAL,
      status: ProjectStatusEnum.UPCOMING,
      builder_id: '',
      city_id: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof addProjectSchema>) => {
    try {
      const res = await ProjectRepository.addNewProject(values);
      console.log(res);
      toast.success('Project added successfully');
    } catch (error: any) {
      toast.error('Failed to add project', {
        description: error,
      });
    }
  };

  const cities = useSelector((state: RootState) => state.city.cities);
  const developers = useSelector(
    (state: RootState) => state.developer.developers,
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
        <DialogContent className="max-w-2xl" showCloseButton>
          <DialogHeader>
            <DialogTitle>Add new project</DialogTitle>
          </DialogHeader>
          <div className="-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 p-0.5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="col-span-4 flex flex-col gap-2">
                        <FormControl>
                          <Input
                            {...field}
                            className="col-span-4"
                            placeholder="Enter name"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter description"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.value || null)
                          }
                          className="col-span-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city_id"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        City <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="col-span-4 flex flex-col gap-2">
                        <SelectDropdown
                          defaultValue={field.value ?? undefined}
                          onValueChange={field.onChange}
                          placeholder="Select City"
                          className="col-span-4"
                          items={cities.map((c) => ({
                            label: c.name,
                            value: c.id,
                          }))}
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="launch_date"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Launch Date
                      </FormLabel>
                      <div className="col-span-4 flex flex-col gap-2">
                        <FormControl>
                          <Input
                            placeholder="Enter launch date"
                            className="col-span-4"
                            {...field}
                            value={field.value ?? ''}
                            onChange={(e) =>
                              field.onChange(e.target.value || null)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="possession_date"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Possession Date
                      </FormLabel>
                      <div className="col-span-4 flex flex-col gap-2">
                        <FormControl>
                          <Input
                            placeholder="Enter possession date"
                            className="col-span-4"
                            {...field}
                            value={field.value ?? ''}
                            onChange={(e) =>
                              field.onChange(e.target.value || null)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="project_type"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Project Type <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="col-span-4 flex flex-col gap-2">
                        <SelectDropdown
                          defaultValue={field.value ?? undefined}
                          onValueChange={field.onChange}
                          placeholder="Select City"
                          className="col-span-4"
                          items={[
                            {
                              label: 'Residential',
                              value: ProjectTypeEnum.RESIDENTIAL,
                            },
                            {
                              label: 'Commercial',
                              value: ProjectTypeEnum.COMMERCIAL,
                            },
                            {
                              label: 'Mixed',
                              value: ProjectTypeEnum.MIXED,
                            },
                          ]}
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Status <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="col-span-4 flex flex-col gap-2">
                        <SelectDropdown
                          defaultValue={field.value ?? undefined}
                          onValueChange={field.onChange}
                          placeholder="Select Status"
                          className="col-span-4"
                          items={[
                            {
                              label: 'Upcoming',
                              value: ProjectStatusEnum.UPCOMING,
                            },
                            {
                              label: 'Ongoing',
                              value: ProjectStatusEnum.ONGOING,
                            },
                            {
                              label: 'Completed',
                              value: ProjectStatusEnum.COMPLETED,
                            },
                          ]}
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="builder_id"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Builder <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="col-span-4 flex flex-col gap-2">
                        <SelectDropdown
                          defaultValue={field.value ?? undefined}
                          onValueChange={field.onChange}
                          placeholder="Select Builder"
                          className="col-span-4"
                          items={developers.map((d) => ({
                            label: d.name,
                            value: d.id,
                          }))}
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div className="h-px w-full bg-gray-200" />
                <div className="flex justify-center">
                  <Button type="submit" className="w-[50%]">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
