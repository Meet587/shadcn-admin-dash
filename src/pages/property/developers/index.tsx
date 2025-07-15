import { Main } from '../../../components/layout/main';
import DeveloperTable from './components/Developer-table';
import { PrimaryButtons } from './components/primary-buttons';

const Developers = () => {
  return (
    <>
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Developers</h2>
            {/* <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p> */}
          </div>
          <PrimaryButtons />
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <DeveloperTable />
        </div>
      </Main>

      {/* <TasksDialogs /> */}
    </>
  );
};

export default Developers;
