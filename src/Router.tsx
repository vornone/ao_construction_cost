import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
], {
  basename: '/ao_construction_cost'  // Always use this basename
});

export function Router() {
  return <RouterProvider router={router} />;
}