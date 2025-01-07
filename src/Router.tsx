import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
], {
  basename: process.env.NODE_ENV === 'production' 
    ? '/ao_construction_cost'  // Replace with your repository name
    : '/'
});

export function Router() {
  return <RouterProvider router={router} />;
}