// import { lazy } from "react";
import Login from '../pages/Authentication/Login';
import Dashboard from '../pages/Dashboard';
// import Dashboard from "../pages/Dashboard";

// const Appointments = lazy(() => import("../pages/Appointments"));
// const Builders = lazy(() => import("../pages/Builders"));
// const Clients = lazy(() => import("../pages/Clients"));
// const ClientDetailsPage = lazy(() => import("../pages/Clients/ClientsDetails"));
// const Commissions = lazy(() => import("../pages/commissions"));
// // const Dashboard = lazy(() => import("../pages/Dashboard"));
// const Deals = lazy(() => import("../pages/Deals"));
// const Documents = lazy(() => import("../pages/Documents"));
// const Maintenance = lazy(() => import("../pages/Maintenance"));
// const Peoples = lazy(() => import("../pages/People"));
// const Property = lazy(() => import("../pages/Property"));
// const NewProperty = lazy(() => import("../pages/Property/AddNew"));
// const PropertyDetails = lazy(() => import("../pages/Property/PropertyDetails"));
// const Reports = lazy(() => import("../pages/Reports"));
// const Settings = lazy(() => import("../pages/Settings"));

interface ProtectedRouteInterface {
  path: string;
  component: React.ReactNode;
}

const ProtectedRoutes: ProtectedRouteInterface[] = [
  { path: '/dashboard', component: <Dashboard /> },
  // { path: "/property", component: <Property /> },
  // { path: "/property/new", component: <NewProperty /> },
  // { path: "/property/:propertyId/details", component: <PropertyDetails /> },
  // { path: "/people", component: <Peoples /> },
  // { path: "/clients", component: <Clients /> },
  // { path: "/clients/:clientId/details", component: <ClientDetailsPage /> },
  // { path: "/appointments", component: <Appointments /> },
  // { path: "/documents", component: <Documents /> },
  // { path: "/reports", component: <Reports /> },
  // { path: "/settings", component: <Settings /> },
  // { path: "/builders", component: <Builders /> },
  // { path: "/deals", component: <Deals /> },
  // { path: "/commissions", component: <Commissions /> },
];

const PublicRoutes: ProtectedRouteInterface[] = [
  { path: '/', component: <Login /> },
  // { path: "/maintenance", component: <Maintenance /> },
];

export { ProtectedRoutes, PublicRoutes };
