import Loader from '../components/loader/Loader.tsx';
import { ErrorState } from '../components/ErrorState.tsx';
import ProductList from '../components/ProductList/ProductList.tsx';
import { EmptyState } from '../components/EmptyState.tsx';
import { Outlet, useMatch } from 'react-router-dom';
import Search from '../components/Search/Search.tsx';
import Pagination from '../components/Pagination/Pagination.tsx';
import { useProducts } from '../hooks/useProducts.ts';

export default function ProductsPage() {
  const { products, loading, error, searchQuery, totalProducts, handleSearch } =
    useProducts();

  const isDetailsRoute = useMatch('/details/:id');

  return (
    <div className="flex flex-col gap-10 font-inter text-base bg-gray-50 w-full min-h-screen">
      <Search searchQuery={searchQuery} onSearch={handleSearch} />

      <div
        className={`relative min-h-screen w-full ${isDetailsRoute ? 'grid md:grid-cols-[2fr_1fr] gap-10' : ''}`}
      >
        <div className="min-h-screen flex flex-col gap-12 items-center justify-start">
          {loading && (
            <div className="flex items-center justify-center min-h-screen">
              <Loader />
            </div>
          )}

          {!loading && products.length === 0 && !error && (
            <EmptyState message="No products matched your search!" />
          )}

          {error && <ErrorState error={error} />}

          {!loading && !error && products.length > 0 && (
            <ProductList products={products} />
          )}

          {!loading && !error && products.length > 0 && (
            <Pagination totalProducts={totalProducts} />
          )}
        </div>

        {isDetailsRoute && (
          <div
            className="sm:min-w-100 flex justify-center items-center
              w-full sticky top-20 max-h-screen
              bg-white rounded-lg border border-gray-200 p-6
              transform transition-all duration-300 ease-out
              translate-x-0 opacity-100
              animate-[slideIn_.3s_ease-out]"
          >
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
}
