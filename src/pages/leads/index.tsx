import { Main } from '../../components/layout/main';
import LeadsTable from './components/leads-table';

const Leads = () => {
  return (
    <Main>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
          {/* <p className="text-muted-foreground">
        Here&apos;s a list of your tasks for this month!
      </p> */}
        </div>
        {/* <PrimaryButtons /> */}
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
        <LeadsTable />
      </div>
    </Main>
  );
};

export default Leads;
