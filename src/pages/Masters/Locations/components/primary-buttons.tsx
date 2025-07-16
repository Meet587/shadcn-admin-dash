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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { LocationRepository } from '../../../../repositories/locations.action';

export function PrimaryButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const addLocationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    state: z.string().min(1, 'State is required'),
    country: z.string().min(1, 'Country is required'),
    pincode: z.string().min(1, 'Pincode is required'),
  });

  const form = useForm({
    resolver: zodResolver(addLocationSchema),
    defaultValues: {
      name: '',
      state: '',
      country: '',
      pincode: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof addLocationSchema>) => {
    try {
      await LocationRepository.addNewLocation(values);
      toast.success('Location added successfully');
      form.reset();
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to add location', {
        description: error as string,
      });
    }
  };

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
            <DialogTitle>Add new location</DialogTitle>
          </DialogHeader>
          <div className="-mr-4 w-full overflow-y-auto py-1 pr-4">
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
                  name="state"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        State
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter state"
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
                  name="country"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Country
                      </FormLabel>
                      <Input
                        placeholder="Enter country"
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value || null)}
                        className="col-span-4"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                      <FormLabel className="col-span-2 text-right">
                        Pincode
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter pincode"
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
