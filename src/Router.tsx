import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
], {
  basename: '/'  // Always use this basename
});

export function Router() {
  return <RouterProvider router={router} />;
}