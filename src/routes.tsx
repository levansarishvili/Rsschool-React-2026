// src/routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.tsx';
import ProductsPage from './pages/ProductsPage.tsx';
import NotFound from './pages/NotFound.tsx';
import AboutPage from './pages/AboutPage.tsx';
import DetailsPage from './pages/DetailsPage.tsx';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '',
          element: <ProductsPage />,
          children: [
            {
              path: 'details/:id',
              element: <DetailsPage />,
            },
          ],
        },
        {
          path: 'about',
          element: <AboutPage />,
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
