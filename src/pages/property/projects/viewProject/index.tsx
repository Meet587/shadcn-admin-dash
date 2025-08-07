import { Main } from '@/components/layout/main';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IBuilder } from '@/repositories/builders.action';
import { ILocation } from '@/repositories/locations.action';
import ProjectRepository, {
  IAmenity,
  IProject,
} from '@/repositories/project.action';
import { RootState } from '@/store/store';
import {
  ArrowLeft,
  Building,
  Calendar,
  FileText,
  Globe,
  Image as ImageIcon,
  MapPin,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

const ViewProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<IProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Get data from Redux store
  const builders = useSelector(
    (state: RootState) => state.developer.developers,
  ) as IBuilder[];
  const locations = useSelector(
    (state: RootState) => state.locations.locations,
  ) as ILocation[];
  const amenities = useSelector(
    (state: RootState) => state.project.amenities,
  ) as IAmenity[];

  // Check if related data is available
  const isRelatedDataLoading = !builders || !locations || !amenities;

  const fetchProject = async () => {
    if (!id) {
      setError('Project ID is required');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const projectData = await ProjectRepository.fetchProjectById(id);

      if (!projectData) {
        setError('Project not found');
        return;
      }

      setProject(projectData);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch project details';
      setError(errorMessage);

      // Show toast only on first attempt or after retries
      if (retryCount === 0) {
        toast.error('Failed to load project details', {
          description: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    fetchProject();
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  // Helper functions to resolve data
  const getBuilderInfo = (builderId: number): IBuilder | null => {
    if (!builders || builders.length === 0) return null;
    return builders.find((b) => b.id === builderId.toString()) || null;
  };

  const getCityNames = (cityIds: string[]): string => {
    if (!cityIds || cityIds.length === 0) return 'Location not specified';
    if (!locations || locations.length === 0)
      return 'Location data unavailable';

    const cityNames = cityIds
      .map((cityId) => {
        const location = locations.find((l) => l.id.toString() === cityId);
        return location?.name;
      })
      .filter(Boolean);

    return cityNames.length > 0
      ? cityNames.join(', ')
      : 'Location not specified';
  };

  const getAmenityNames = (amenityIds: string[]): string[] => {
    if (!amenityIds || amenityIds.length === 0) return [];
    if (!amenities || amenities.length === 0) return [];

    return amenityIds
      .map((amenityId) => {
        const amenity = amenities.find((a) => a.id.toString() === amenityId);
        return amenity?.name;
      })
      .filter(Boolean) as string[];
  };

  const formatPossessionDate = (month: number | null, year: number): string => {
    if (!month || !year) return 'TBD';

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

    const monthName = months[month - 1];
    return monthName ? `${monthName} ${year}` : 'TBD';
  };

  const formatConstructionType = (type: string): string => {
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const formatPropertyType = (type: string): string => {
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  if (isLoading || (project && isRelatedDataLoading)) {
    return (
      <Main>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
            <div className="space-y-2">
              <p className="text-muted-foreground font-medium">
                {isRelatedDataLoading && project
                  ? 'Loading related data...'
                  : retryCount > 0
                  ? 'Retrying...'
                  : 'Loading project details...'}
              </p>
              {retryCount > 0 && !isRelatedDataLoading && (
                <p className="text-xs text-muted-foreground">
                  Attempt {retryCount + 1}
                </p>
              )}
            </div>
          </div>
        </div>
      </Main>
    );
  }

  if (error || (!project && !isLoading)) {
    return (
      <Main>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md">
            <div className="mb-4">
              <div className="text-destructive text-lg font-semibold mb-2">
                {error === 'Project ID is required' ||
                error === 'Invalid project ID format'
                  ? 'Invalid Request'
                  : error === 'Project not found'
                  ? 'Project Not Found'
                  : 'Loading Error'}
              </div>
              <p className="text-muted-foreground text-sm">
                {error || 'Project not found'}
              </p>
              {retryCount > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Retry attempt: {retryCount}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              {/* Show retry button for network/server errors, not for invalid ID or not found */}
              {error &&
                error !== 'Project ID is required' &&
                error !== 'Invalid project ID format' &&
                error !== 'Project not found' && (
                  <Button onClick={handleRetry} variant="default" size="sm">
                    Try Again
                  </Button>
                )}

              <Button
                onClick={() => navigate('/projects')}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </div>
          </div>
        </div>
      </Main>
    );
  }

  // At this point, we know project is not null due to the checks above
  if (!project) {
    return null; // This should never happen due to the checks above
  }

  const resolvedAmenities = getAmenityNames(project.amenities_ids);

  return (
    <Main>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate('/projects')}
            variant="outline"
            size="sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {project.name}
            </h1>
            <p className="text-muted-foreground">Project Details</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Basic Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="mr-2 h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">
                Project Name
              </h3>
              <p className="text-lg font-medium">{project.name}</p>
            </div>

            {project.description && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">
                  Description
                </h3>
                <p className="text-sm">{project.description}</p>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">
                Construction Type
              </h3>
              <Badge variant="secondary">
                {formatConstructionType(project.construction_type)}
              </Badge>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">
                Ready Possession
              </h3>
              <Badge
                variant={project.is_ready_possession ? 'default' : 'outline'}
              >
                {project.is_ready_possession ? 'Yes' : 'No'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Developer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Developer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(() => {
              const builder = getBuilderInfo(project.builder_id);
              if (builder) {
                return (
                  <>
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground">
                        Developer Name
                      </h3>
                      <p className="font-medium">{builder.name}</p>
                    </div>
                    {builder.email && (
                      <div>
                        <h3 className="font-semibold text-sm text-muted-foreground">
                          Email
                        </h3>
                        <p className="text-sm">{builder.email}</p>
                      </div>
                    )}
                    {builder.phone && (
                      <div>
                        <h3 className="font-semibold text-sm text-muted-foreground">
                          Phone
                        </h3>
                        <p className="text-sm">{builder.phone}</p>
                      </div>
                    )}
                  </>
                );
              } else {
                return (
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground">
                      Developer Name
                    </h3>
                    <p className="font-medium text-muted-foreground">
                      {!builders || builders.length === 0
                        ? 'Developer data unavailable'
                        : 'Unknown Developer'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {!builders || builders.length === 0
                        ? 'Developer information is still loading'
                        : 'Developer information not found'}
                    </p>
                  </div>
                );
              }
            })()}
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">
                Cities
              </h3>
              <p className="text-sm">{getCityNames(project.city_id)}</p>
            </div>

            {project.address_line1 && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">
                  Address Line 1
                </h3>
                <p className="text-sm">{project.address_line1}</p>
              </div>
            )}

            {project.address_line2 && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">
                  Address Line 2
                </h3>
                <p className="text-sm">{project.address_line2}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {project.construction_year && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">
                  Construction Year
                </h3>
                <p className="text-sm">{project.construction_year}</p>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">
                Possession Date
              </h3>
              <p className="text-sm">
                {formatPossessionDate(
                  project.possession_month,
                  project.possession_year,
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Property Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="mr-2 h-5 w-5" />
              Property Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {project.property_types && project.property_types.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">
                  Property Types
                </h3>
                <div className="flex flex-wrap gap-1">
                  {project.property_types.map((type, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {formatPropertyType(type)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {project.property_subtypes &&
              project.property_subtypes.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    Property Subtypes
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {project.property_subtypes.map((subtype, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {formatPropertyType(subtype)}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

            {(!project.property_types || project.property_types.length === 0) &&
              (!project.property_subtypes ||
                project.property_subtypes.length === 0) && (
                <p className="text-muted-foreground text-sm">
                  No property type information available
                </p>
              )}
          </CardContent>
        </Card>

        {/* Amenities */}
        {resolvedAmenities.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {resolvedAmenities.map((amenity, index) => (
                  <Badge key={index} variant="secondary">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Images */}
        {project.main_image_url && (
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="mr-2 h-5 w-5" />
                Project Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                    Main Project Image
                  </h3>
                  <div className="relative max-w-md">
                    <img
                      src={project.main_image_url}
                      alt={`${project.name} - Main Image`}
                      className="w-full h-48 object-cover rounded-lg border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback =
                          target.nextElementSibling as HTMLElement;
                        if (fallback) {
                          fallback.classList.remove('hidden');
                          fallback.classList.add('flex');
                        }
                      }}
                    />
                    <div className="hidden w-full h-48 bg-muted rounded-lg border items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Image not available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Documents & Links */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Documents & Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {project.brochure_url && (
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={project.brochure_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    View Brochure
                  </a>
                </div>
              )}

              {project.website_url && (
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={project.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    Visit Website
                  </a>
                </div>
              )}

              {!project.main_image_url && (
                <div className="flex items-center space-x-2">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">
                    No project image available
                  </span>
                </div>
              )}
            </div>

            {!project.brochure_url && !project.website_url && (
              <p className="text-muted-foreground text-sm">
                No documents or links available
              </p>
            )}
          </CardContent>
        </Card>

        {/* Legal Information */}
        {(project.rera_number || project.gst_number) && (
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Legal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {project.rera_number && (
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground">
                      RERA Number
                    </h3>
                    <p className="text-sm font-mono">{project.rera_number}</p>
                  </div>
                )}

                {project.gst_number && (
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground">
                      GST Number
                    </h3>
                    <p className="text-sm font-mono">{project.gst_number}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Project Metadata */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Project Metadata</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">
                  Created At
                </h3>
                <p className="text-sm">
                  {new Date(project.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">
                  Last Updated
                </h3>
                <p className="text-sm">
                  {new Date(project.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Main>
  );
};

export default ViewProject;
