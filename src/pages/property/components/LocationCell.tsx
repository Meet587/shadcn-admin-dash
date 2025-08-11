import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const LocationCell = ({
  cityIds,
}: {
  cityIds: {
    id: number;
    name: string;
  }[];
}) => {
  const locationsArray = useSelector(
    (state: RootState) => state.locations.locations,
  );
  // Handle empty or invalid city IDs gracefully
  if (!cityIds || cityIds.length === 0) {
    return (
      <div className="min-w-[120px] text-muted-foreground">
        Location not specified
      </div>
    );
  }

  // Handle loading state while locations data is being fetched
  if (locationsArray.length === 0) {
    return (
      <div className="min-w-[120px] flex items-center">
        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  // Handle case where no cities are found
  if (cityIds.length === 0) {
    return (
      <div className="min-w-[120px] text-muted-foreground">
        Cities not found
      </div>
    );
  }

  // Format multiple cities as comma-separated list with truncation for long lists
  const cityNames = cityIds.map((city) => city.name);

  // Show first 2 cities, then "+ X more" if more than 2
  if (cityNames.length <= 2) {
    return <div className="min-w-[120px]">{cityNames.join(', ')}</div>;
  } else {
    const displayCities = cityNames.slice(0, 2).join(', ');
    const remainingCount = cityNames.length - 2;
    return (
      <div className="min-w-[120px]" title={cityNames.join(', ')}>
        {displayCities} + {remainingCount} more
      </div>
    );
  }
};

export default LocationCell;
