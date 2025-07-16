import { Main } from '../../../components/layout/main';
import LocationTable from './components/location-table';
import { PrimaryButtons } from './components/primary-buttons';

const Locations = () => {
  return (
    <Main>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Locations</h2>
        </div>
        <PrimaryButtons />
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
        <LocationTable />
      </div>
    </Main>
  );
};

export default Locations;
