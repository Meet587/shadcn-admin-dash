import SignIn from '../pages/Authentication/sign-in';
import Dashboard from '../pages/Dashboard';
import Developers from '../pages/property/developers';
import Projects from '../pages/property/projects';
import Property from '../pages/property/property';
import Users from '../pages/users';

interface ProtectedRouteInterface {
  path: string;
  component: React.ReactNode;
}

const ProtectedRoutes: ProtectedRouteInterface[] = [
  { path: '/dashboard', component: <Dashboard /> },
  { path: '/developers', component: <Developers /> },
  { path: '/projects', component: <Projects /> },
  { path: '/property', component: <Property /> },
  { path: '/users', component: <Users /> },
];

const PublicRoutes: ProtectedRouteInterface[] = [
  { path: '/', component: <SignIn /> },
];

export { ProtectedRoutes, PublicRoutes };
