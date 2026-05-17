import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import DetailsPage from './pages/DetailsPage';
import NotFound from './pages/NotFound';

export default function AppRouter() {
  return (
    <BrowserRouter basename="/Rsschool-React-2026/">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<ProductsPage />}>
            <Route index element={null} />

            <Route path="details/:id" element={<DetailsPage />} />
          </Route>

          <Route path="about" element={<AboutPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
