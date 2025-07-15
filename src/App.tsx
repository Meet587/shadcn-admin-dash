import { FontProvider } from '@/context/font-context';
import { ThemeProvider } from '@/context/theme-context';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router';
import './App.css';
import { AuthenticatedLayout } from './components/layout/authenticated-layout';
import Loading from './components/Loading';
import { Toaster } from './components/ui/sonner';
import NotFoundError from './pages/Errors/not-found-error';
import { ProtectedRoutes, PublicRoutes } from './router';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <FontProvider>
          {/* <RouterProvider router={router} /> */}
          <Routes>
            {ProtectedRoutes.map((page) => (
              <Route
                key={page.path}
                path={page.path}
                element={
                  <AuthenticatedLayout>
                    <Suspense fallback={<Loading />}>{page.component}</Suspense>
                  </AuthenticatedLayout>
                }
              />
            ))}
            <Route>
              {PublicRoutes.map((page) => (
                <Route
                  key={page.path}
                  path={page.path}
                  element={
                    <Suspense fallback={<Loading />}>{page.component}</Suspense>
                  }
                />
              ))}
            </Route>
            <Route
              path="*"
              element={
                <Suspense fallback={<Loading />}>
                  <NotFoundError />
                </Suspense>
              }
            />
          </Routes>
          <Toaster duration={5000} richColors />
        </FontProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
