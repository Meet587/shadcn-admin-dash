import { Suspense, useState } from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { AuthenticatedLayout } from './components/layout/authenticated-layout';
import Loading from './components/Loading';
import NotFoundError from './pages/Errors/not-found-error';
import { ProtectedRoutes, PublicRoutes } from './router';
import { store } from './store/store';
import { FontProvider } from '@/context/font-context';
import { ThemeProvider } from '@/context/theme-context';

function App() {
  const [mode] = useState<'light' | 'dark'>('light');

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme={mode} storageKey="vite-ui-theme">
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
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={mode}
          />
        </FontProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
