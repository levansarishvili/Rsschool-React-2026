// src/routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.tsx';
import ProductsPage from './pages/ProductsPage.tsx';
import Details from './pages/Details.tsx';
import About from './pages/About.tsx';
import NotFound from './pages/NotFound.tsx';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [
        {
          path: '',
          element: <ProductsPage />,
          children: [
            {
              path: 'details/:id',
              element: <Details />,
            },
          ],
        },
        {
          path: 'about',
          element: <About />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
  {
    basename: '/Rsschool-React-2026/',
  }
);
