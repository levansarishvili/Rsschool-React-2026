import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import DetailsPage from './pages/DetailsPage';
import NotFound from './pages/NotFound';
import RootLayout from './components/layout/RootLayout';
import HomePage from './pages/HomePage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />}>
            <Route path="/products/:id" element={<DetailsPage />} />
          </Route>

          <Route path="about" element={<AboutPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
