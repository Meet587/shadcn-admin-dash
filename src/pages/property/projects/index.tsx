import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Main } from '../../../components/layout/main';
import ProjectRepository from '../../../repositories/project.action';
import { _setAmenities } from '../../../store/projects/action';
import { PrimaryButtons } from './components/primary-buttons';
import ProjectsTable from './components/project-table';

const Projects = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAmenities();
  }, []);

  const fetchAmenities = async () => {
    try {
      const res = await ProjectRepository.fetchAmenities();
      dispatch(_setAmenities(res));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          </div>
          <PrimaryButtons />
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <ProjectsTable />
        </div>
      </Main>
    </>
  );
};

export default Projects;
