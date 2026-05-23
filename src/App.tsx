import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import DetailsPage from './pages/DetailsPage';
import NotFound from './pages/NotFound';
import RootLayout from './components/layout/RootLayout';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<ProductsPage />}>
            <Route path="/details/:id" element={<DetailsPage />} />
          </Route>

          <Route path="about" element={<AboutPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
