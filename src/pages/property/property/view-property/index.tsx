import BackButton from '@/components/BackButton';
import { Main } from '@/components/layout/main';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency, formatDate } from '@/lib/formetters';
import PropertyRepository, {
  IPropertyDetails,
} from '@/repositories/property.action';
import { Bath, Bed, Layers, MapPin } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';

const ViewProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<IPropertyDetails | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = useCallback(async () => {
    try {
      setLoading(true);
      const response = await PropertyRepository.fetchPropertyById(id as string);
      setProperty(response);
    } catch (error) {
      console.error('Error fetching property:', error);
      toast.error('Error while fetching property');
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Main>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Main>
    );
  }

  if (!property) {
    return (
      <Main>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Property not found</h2>
          <p className="text-muted-foreground mt-2">
            The property you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </Main>
    );
  }

  const {
    title,
    code,
    listing_for,
    property_type,
    property_sub_type,
    key_status,
    key_info,
    ready_status,
    available_from,
    address_line1,
    address_line2,
    landmark,
    city,
    state,
    zip_code,
    country,
    tower,
    unit_no,
    floor_no,
    total_floors,
    bhk,
    bathrooms,
    balconies,
    other_rooms,
    furnishing,
    ready_to_build_furniture,
    pet_allowed,
    non_veg_allowed,
    reserved_parkings,
    covered_parking_count,
    open_parking_count,
    ownership,
    facing,
    description,
    assign_to,
    project,
    builder,
    pricing,
    uploads = [],
    amenities = [],
    furnitures = [],
    locations = [],
  } = property;

  const propertyImages = uploads.filter((upload) =>
    upload.file_type.startsWith('image/'),
  );

  const floorPlans = uploads.filter((upload) =>
    upload.caption.toLowerCase().includes('floor plan'),
  );

  return (
    <Main className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              {[address_line1, address_line2, city, state, zip_code, country]
                .filter(Boolean)
                .join(', ')}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              {property_type.replace('_', ' ')}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {property_sub_type.replace('_', ' ')}
            </Badge>
          </div>
          <BackButton />
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="floor-plans">Floor Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Property ID
                          </p>
                          <p className="font-medium">{code}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Listing For
                          </p>
                          <Badge className="font-semibold capitalize">
                            {listing_for?.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Property Type
                          </p>
                          <p className="font-medium capitalize">
                            {property_type?.replace('_', ' ')}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Property Subtype
                          </p>
                          <p className="font-medium capitalize">
                            {property_sub_type?.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Ready Status
                          </p>
                          <p className="font-medium capitalize">
                            {ready_status?.replace('_', ' ')}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Key Status
                          </p>
                          <p className="font-medium">
                            {key_status || 'Not specified'}
                          </p>
                        </div>
                        {key_info && (
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Key Info
                            </p>
                            <p className="font-medium">{key_info}</p>
                          </div>
                        )}
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Ownership
                          </p>
                          <p className="font-medium capitalize">{ownership}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Available From
                          </p>
                          <p className="font-medium">
                            {formatDate(available_from)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">BHK</p>
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          <span className="font-medium">{bhk} BHK</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Bathrooms
                        </p>
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          <span className="font-medium">{bathrooms}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Balconies
                        </p>
                        <p className="font-medium">{balconies}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Floors</p>
                        <div className="flex items-center gap-1">
                          <Layers className="h-4 w-4" />
                          <span className="font-medium">
                            {floor_no} of {total_floors}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Furnishing
                        </p>
                        <p className="font-medium capitalize">
                          {furnishing?.replace('_', ' ')}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Facing</p>
                        <p className="font-medium capitalize">
                          {facing?.replace('_', ' ')}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Tower</p>
                        <p className="font-medium">{tower || 'N/A'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Unit No</p>
                        <p className="font-medium">{unit_no || 'N/A'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Landmark
                        </p>
                        <p className="font-medium">{landmark || 'N/A'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Ready to Build Furniture
                        </p>
                        <p className="font-medium">
                          {ready_to_build_furniture ? 'Yes' : 'No'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Pet Allowed
                        </p>
                        <p className="font-medium">
                          {pet_allowed ? 'Yes' : 'No'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Non-Veg Allowed
                        </p>
                        <p className="font-medium">
                          {non_veg_allowed ? 'Yes' : 'No'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Reserved Parkings
                        </p>
                        <p className="font-medium">
                          {reserved_parkings ? 'Yes' : 'No'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Covered Parking
                        </p>
                        <p className="font-medium">
                          {covered_parking_count || 0}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Open Parking
                        </p>
                        <p className="font-medium">{open_parking_count || 0}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {locations && locations.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Locations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {locations.map((location) => (
                          <div
                            key={location.id}
                            className="flex justify-between"
                          >
                            <span className="text-muted-foreground">
                              {location.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Area</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Pricing Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Basic Amount
                          </span>
                          <span className="font-medium">
                            {formatCurrency(pricing?.basic_amount)}
                          </span>
                        </div>
                        {pricing?.extra_charges?.length > 0 && (
                          <div className="border-t border-muted-foreground/20 pt-2 mt-2">
                            <p className="text-sm text-muted-foreground mb-2">
                              Extra Charges:
                            </p>
                            {pricing.extra_charges.map((charge) => (
                              <div
                                key={charge.id}
                                className="flex justify-between text-sm"
                              >
                                <span className="text-muted-foreground">
                                  {charge.charge_type}
                                  {charge.percentage &&
                                    ` (${charge.percentage}%)`}
                                </span>
                                <span className="font-medium">
                                  {formatCurrency(charge.amount)}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex justify-between pt-2 border-t border-muted-foreground/20">
                          <span className="text-muted-foreground font-medium">
                            Total Amount
                          </span>
                          <span className="font-semibold text-lg">
                            {formatCurrency(pricing?.total_amount)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Area Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Price per Unit
                          </span>
                          <span className="font-medium">
                            {formatCurrency(pricing?.ppu)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Carpet Area
                          </span>
                          <span className="font-medium">
                            {pricing?.carpet_area} {pricing?.area_unit}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Super Built-up Area
                          </span>
                          <span className="font-medium">
                            {pricing?.super_build_up_area} {pricing?.area_unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {amenities.map((amenity) => (
                      <Badge
                        key={amenity.id}
                        variant="secondary"
                        className="capitalize"
                      >
                        {amenity.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {other_rooms && other_rooms.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Other Rooms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {other_rooms.map((room) => (
                        <Badge
                          key={room}
                          variant="secondary"
                          className="capitalize"
                        >
                          {room}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {furnitures.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Furniture & Appliances</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {furnitures.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm">{item.item_name}</span>
                          <span className="text-sm text-muted-foreground">
                            x{item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground mr-3">
                          Project
                        </span>
                        <span className="font-medium">
                          {project?.name || 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground mr-3">
                          Developer
                        </span>
                        <span className="font-medium">
                          {builder?.name || 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground mr-3">
                          Construction Type
                        </span>
                        <span className="font-medium capitalize">
                          {project?.construction_type?.replace('_', ' ') ||
                            'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground mr-3">
                          GST Number
                        </span>
                        <span className="font-medium">
                          {project?.gst_number || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assigned To</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">
                        {assign_to?.first_name?.charAt(0) || 'A'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">
                        {assign_to?.first_name + ' ' + assign_to?.last_name ||
                          'Not assigned'}
                      </p>
                      <p className="font-medium">{assign_to?.email || 'N/A'}</p>
                      <p className="font-medium">{assign_to?.phone || 'N/A'}</p>
                      <p
                        className={`${
                          assign_to?.status ? 'text-green-500' : 'text-red-500'
                        } font-medium`}
                      >
                        {assign_to?.status ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* <Card>
                <CardHeader>
                  <CardTitle>Contact Agent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Interested in this property?
                    </p>
                    <Button className="w-full">Contact Agent</Button>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4">
          {propertyImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {propertyImages.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-video rounded-lg overflow-hidden"
                >
                  <img
                    src={image.file_path}
                    alt={image.caption || 'Property Image'}
                    className="w-full h-full object-cover"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white text-sm">{image.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">No images available</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="floor-plans">
          {floorPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {floorPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <img
                    src={plan.file_path}
                    alt="Floor Plan"
                    className="w-full h-auto"
                  />
                  {plan.caption && (
                    <div className="p-4 border-t">
                      <p className="font-medium text-center">{plan.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">No floor plans available</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Main>
  );
};

export default ViewProperty;
