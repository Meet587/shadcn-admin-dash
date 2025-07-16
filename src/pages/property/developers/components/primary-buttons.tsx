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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import z from 'zod';
import { SelectDropdown } from '../../../../components/select-dropdown';
import BuilderRepository from '../../../../repositories/builders.action';

export function PrimaryButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const addBuilderSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    address: z.string().nullable(),
    city_id: z.string().nullable(),
    email: z.string().email('Invalid email').nullable(),
    phone: z.string().nullable(),
    website: z.string().url('Invalid URL').nullable(),
    commission_rate: z
      .number({ message: 'Commission rate must be a number' })
      .min(0, 'Commission rate must be greater than or equal to 0'),
  });

  const form = useForm({
    resolver: zodResolver(addBuilderSchema),
    defaultValues: {
      name: '',
      address: null,
      city_id: null,
      email: null,
      phone: null,
      website: null,
      commission_rate: 0,
    },
  });

  const handleSubmit = async (values: z.infer<typeof addBuilderSchema>) => {
    try {
      const res = await BuilderRepository.addNewBuilder(values);
      console.log(res);
      toast.success('Developer added successfully');
      form.reset();
      setIsOpen(false);
    } catch (error: any) {
      toast.error('Failed to add developer', {
        description: error,
      });
    }
  };

  const locations = useSelector((state: RootState) => state.locations.locations);

  return (
    <div className="flex gap-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger
          className="flex items-center gap-2"
          role="button"
          asChild
          onClick={() => {
            form.reset();
            setIsOpen(true);
          }}
        >
          <Button>
            <span>Create</span> <PlusIcon size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new developer</DialogTitle>
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
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="col-span-4"
                          placeholder="Enter name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter address"
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
                        City
                      </FormLabel>
                      <SelectDropdown
                        defaultValue={field.value ?? undefined}
                        onValueChange={field.onChange}
                        placeholder="Select City"
                        className="col-span-4"
                        items={locations.map((l) => ({
                          label: l.name,
                          value: l.id,
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter email"
                          className="col-span-4"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.value || null)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter phone number"
                          className="col-span-4"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.value || null)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Website
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter website"
                          className="col-span-4"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.value || null)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="commission_rate"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Commission Rate
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter commission rate"
                          className="col-span-4"
                          type="number"
                          step="any"
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
