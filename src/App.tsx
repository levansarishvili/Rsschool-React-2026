import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import DetailsPage from './pages/DetailsPage';
import NotFound from './pages/NotFound';
import RootLayout from './components/layout/RootLayout';
import HomePage from './pages/HomePage';
import { ROUTE_PATHS } from './constants';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_PATHS.HOME} element={<RootLayout />}>
          <Route path={ROUTE_PATHS.HOME} element={<HomePage />} />
          <Route path={ROUTE_PATHS.PRODUCTS} element={<ProductsPage />}>
            <Route
              path={ROUTE_PATHS.PRODUCT_DETAILS}
              element={<DetailsPage />}
            />
          </Route>

          <Route path={ROUTE_PATHS.ABOUT} element={<AboutPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
