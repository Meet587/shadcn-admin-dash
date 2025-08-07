import ViewProject from '@/pages/property/projects/viewProject';
import SignIn from '../pages/Authentication/sign-in';
import Dashboard from '../pages/Dashboard';
import Leads from '../pages/leads';
import Locations from '../pages/Masters/Locations';
import Users from '../pages/Masters/users';
import Developers from '../pages/property/developers';
import Projects from '../pages/property/projects';
import AddEditProject from '../pages/property/projects/addEditProject';
import Property from '../pages/property/property';

interface ProtectedRouteInterface {
  path: string;
  component: React.ReactNode;
}

const ProtectedRoutes: ProtectedRouteInterface[] = [
  { path: '/dashboard', component: <Dashboard /> },
  { path: '/developers', component: <Developers /> },
  { path: '/projects', component: <Projects /> },
  { path: '/projects/add', component: <AddEditProject /> },
  { path: '/projects/edit/:id', component: <AddEditProject /> },
  { path: '/projects/view/:id', component: <ViewProject /> },
  { path: '/property', component: <Property /> },
  { path: '/leads', component: <Leads /> },
  { path: '/masters/locations', component: <Locations /> },
  { path: '/masters/users', component: <Users /> },
];

const PublicRoutes: ProtectedRouteInterface[] = [
  { path: '/', component: <SignIn /> },
];

export { ProtectedRoutes, PublicRoutes };
