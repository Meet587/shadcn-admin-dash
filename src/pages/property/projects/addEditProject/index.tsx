import { Main } from '@/components/layout/main';
import { SelectDropdown } from '@/components/select-dropdown';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import ProjectRepository from '@/repositories/project.action';
import { RootState } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import z from 'zod';
import { MultiSelect } from '../../../../components/ui/multi-select';

const PropertyTypes = [
  { label: 'Commercial', value: 'COMMERCIAL' },
  { label: 'Residential', value: 'RESIDENTIAL' },
  { label: 'Land', value: 'LAND' },
];

const PropertySubTypes: Record<string, { label: string; value: string }[]> = {
  COMMERCIAL: [
    { label: 'Shop/Showroom', value: 'SHOP_SHOWROOM' },
    { label: 'Office Space', value: 'OFFICE_SPACE' },
    { label: 'Industrial Shed', value: 'INDUSTRIAL_SHED' },
    { label: 'Warehouse', value: 'WAREHOUSE' },
  ],
  RESIDENTIAL: [
    { label: 'Apartment/Flat', value: 'APARTMENT_FLAT' },
    { label: 'Bungalow/Villa', value: 'BUNGALOW_VILLA' },
    { label: 'Row House', value: 'ROW_HOUSE' },
  ],
  LAND: [{ label: 'Land/Plot', value: 'LAND_PLOT' }],
};

const ConstructionTypes = [
  { label: 'New Construction', value: 'NEW' },
  { label: 'Resale/Old', value: 'OLD' },
];

const AddEditProject = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(
    [],
  );
  const [selectedPropertySubTypes, setSelectedPropertySubTypes] = useState<
    string[]
  >([]);
  const [availableSubTypes, setAvailableSubTypes] = useState<
    { label: string; value: string }[]
  >([]);
  const [searchAmenities, setSearchAmenities] = useState('');
  const [searchBanks, setSearchBanks] = useState('');

  const addProjectSchema = z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().optional(),
    constructionType: z.string().min(1, 'Construction type is required'),
    constructionYear: z.string().optional(),
    possessionMonth: z.string().optional(),
    possessionYear: z.string().optional(),
    isReadyPossession: z.boolean().default(false),
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    reraNumber: z.string().optional(),
    gstNumber: z.string().optional(),
    brochureUrl: z.string().optional(),
    websiteUrl: z.string().optional(),
    mainImageUrl: z.string().optional(),
    builderId: z.string().min(1, 'Builder is required'),
  });

  const form = useForm({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      constructionType: '',
      constructionYear: '',
      possessionMonth: '',
      possessionYear: '',
      isReadyPossession: false,
      addressLine1: '',
      addressLine2: '',
      reraNumber: '',
      gstNumber: '',
      brochureUrl: '',
      websiteUrl: '',
      mainImageUrl: '',
      builderId: '',
    },
  });

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const project = await ProjectRepository.fetchProjectById(id);

        // Set form fields
        form.reset({
          name: project.name || '',
          description: project.description || '',
          constructionType: project.construction_type || '',
          constructionYear: project.construction_year?.toString() || '',
          possessionMonth: project.possession_month?.toString() || '',
          possessionYear: project.possession_year?.toString() || '',
          isReadyPossession: project.is_ready_possession || false,
          addressLine1: project.address_line1 || '',
          addressLine2: project.address_line2 || '',
          reraNumber: project.rera_number || '',
          gstNumber: project.gst_number || '',
          brochureUrl: project.brochure_url || '',
          websiteUrl: project.website_url || '',
          mainImageUrl: project.main_image_url || '',
          builderId: project.builder_id?.toString() || '',
        });

        setSelectedLocations(project.city_id || []);
        setSelectedAmenities(project.amenities_ids || []);
        setSelectedPropertyTypes(project.property_types || []);
        setSelectedPropertySubTypes(project.property_subtypes || []);
      } catch (error) {
        toast.error('Failed to fetch project', {
          description: error as string,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Update available subtypes when property types change
  useEffect(() => {
    const allSubTypes: { label: string; value: string }[] = [];
    selectedPropertyTypes.forEach((type) => {
      if (PropertySubTypes[type]) {
        allSubTypes.push(...PropertySubTypes[type]);
      }
    });
    setAvailableSubTypes(allSubTypes);

    // Clear selected subtypes that are no longer available
    setSelectedPropertySubTypes((prev) =>
      prev.filter((subType) =>
        allSubTypes.some((available) => available.value === subType),
      ),
    );
  }, [selectedPropertyTypes]);

  const handleSubmit = async (values: z.infer<typeof addProjectSchema>) => {
    try {
      setIsLoading(true);
      const projectData = {
        name: values.name,
        description: values.description,
        construction_type: values.constructionType,
        property_types: selectedPropertyTypes,
        property_subtypes: selectedPropertySubTypes,
        construction_year: values.constructionYear
          ? parseInt(values.constructionYear)
          : null,
        possession_month: values.possessionMonth
          ? parseInt(values.possessionMonth)
          : null,
        possession_year: values.possessionYear
          ? parseInt(values.possessionYear)
          : null,
        is_ready_possession: values.isReadyPossession,
        city_id: selectedLocations,
        amenities_ids: selectedAmenities,
        brochure_url: values.brochureUrl || null,
        website_url: values.websiteUrl || null,
        main_image_url: values.mainImageUrl || null,
        address_line1: values.addressLine1 || null,
        address_line2: values.addressLine2 || null,
        rera_number: values.reraNumber || '',
        gst_number: values.gstNumber || '',
        builder_id: parseInt(values.builderId),
      };

      let res;
      if (id) {
        res = await ProjectRepository.updateProject(id, projectData as any);
        toast.success('Project updated successfully');
      } else {
        res = await ProjectRepository.addNewProject(projectData as any);
        toast.success('Project added successfully');
        form.reset();
        setSelectedLocations([]);
        setSelectedAmenities([]);
        setSelectedPropertyTypes([]);
        setSelectedPropertySubTypes([]);
      }
      console.log(res);
    } catch (error) {
      toast.error(`Failed to ${id ? 'update' : 'add'} project`, {
        description: error as string,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const locations = useSelector(
    (state: RootState) => state.locations.locations,
  );
  const developers = useSelector(
    (state: RootState) => state.developer.developers,
  );
  const amenities = useSelector((state: RootState) => state.project.amenities);

  const filteredAmenities = amenities.filter((amenity) =>
    amenity.name.toLowerCase().includes(searchAmenities.toLowerCase()),
  );

  const years = Array.from({ length: 30 }, (_, i) => (2024 - i).toString());
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <Main>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {id ? 'Edit' : 'Add'} Project
          </h2>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 rounded-md border p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Project Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter project name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter description"
                        className="resize-none"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="constructionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Construction Type{' '}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select Construction Type"
                        items={ConstructionTypes}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>
                    Property Types <span className="text-red-500">*</span>
                  </FormLabel>
                  <MultiSelect
                    options={PropertyTypes}
                    value={PropertyTypes.filter((a) =>
                      selectedPropertyTypes.includes(a.value),
                    )}
                    onChange={(value) => {
                      setSelectedPropertyTypes(value.map((v) => v.value));
                    }}
                  />
                </FormItem>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <FormItem>
                  <FormLabel>Property Sub Types</FormLabel>
                  {selectedPropertyTypes.length === 0 ? (
                    <div className="min-h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500 flex items-center">
                      Please select property types first
                    </div>
                  ) : (
                    <MultiSelect
                      options={availableSubTypes}
                      value={availableSubTypes.filter((a) =>
                        selectedPropertySubTypes.includes(a.value),
                      )}
                      onChange={(value) => {
                        setSelectedPropertySubTypes(value.map((v) => v.value));
                      }}
                    />
                  )}
                </FormItem>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="constructionYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Construction Year</FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select Year"
                        items={years.map((year) => ({
                          label: year,
                          value: year,
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="possessionMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Possession Month</FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select Month"
                        items={months.map((month, index) => ({
                          label: month,
                          value: (index + 1).toString(),
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="possessionYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Possession Year</FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select Year"
                        items={years.map((year) => ({
                          label: year,
                          value: year,
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormItem>
                  <FormLabel>Locations</FormLabel>
                  <MultiSelect
                    options={locations.map((d) => ({
                      label: d.name,
                      value: d.id.toString(),
                    }))}
                    value={locations
                      .filter((d) =>
                        selectedLocations.includes(d.id.toString()),
                      )
                      .map((d) => ({ label: d.name, value: d.id.toString() }))}
                    onChange={(value) => {
                      setSelectedLocations(value.map((d) => d.value));
                    }}
                  />
                </FormItem>

                <FormField
                  control={form.control}
                  name="builderId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Builder <span className="text-red-500">*</span>
                      </FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select builder"
                        items={developers.map((dev) => ({
                          label: dev.name,
                          value: dev.id.toString(),
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isReadyPossession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ready Possession</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter address line 1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter address line 2" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="reraNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        RERA Number <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter RERA number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gstNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        GST Number <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter GST number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter website URL"
                          type="url"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="brochureUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brochure URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter brochure URL"
                          type="url"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mainImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Image URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter main image URL"
                          type="url"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-center pt-4">
                <Button type="submit" className="w-[50%]" disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="w-80 space-y-6">
          <div className="rounded-md border p-4">
            <h3 className="font-semibold mb-4">Amenities</h3>
            <div className="space-y-3">
              <Input
                placeholder="Search Amenities"
                value={searchAmenities}
                onChange={(e) => setSearchAmenities(e.target.value)}
              />
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {filteredAmenities.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={amenity.id.toString()}
                        checked={selectedAmenities.includes(
                          amenity.id.toString(),
                        )}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAmenities([
                              ...selectedAmenities,
                              amenity.id.toString(),
                            ]);
                          } else {
                            setSelectedAmenities(
                              selectedAmenities.filter(
                                (a) => a !== amenity.id.toString(),
                              ),
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={amenity.id.toString()}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity.name}
                      </label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="rounded-md border p-4">
            <h3 className="font-semibold mb-4">Associated Banks</h3>
            <Input
              placeholder="Search Bank"
              value={searchBanks}
              onChange={(e) => setSearchBanks(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Main>
  );
};

export default AddEditProject;
