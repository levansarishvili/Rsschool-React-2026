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
    <div className="flex flex-col gap-6 w-full">
      <Search searchQuery={searchQuery} onSearch={handleSearch} />

      <div
        className={`relative w-full ${
          isDetailsRoute
            ? 'grid lg:grid-cols-[1.6fr_1fr] gap-6 items-start'
            : 'flex flex-col'
        }`}
      >
        <div className="w-full flex flex-col items-center justify-start bg-card border border-border/80 rounded-2xl p-2 shadow-xs min-h-[90vh]">
          {loading && (
            <div className="flex flex-col items-center justify-center py-32 my-auto">
              <div className="w-8 h-8 rounded-full border-2 border-border border-t-primary animate-spin" />
              <span className="text-xs font-medium tracking-wide text-text-muted mt-4">
                Loading products...
              </span>
            </div>
          )}

          {!loading && products.length === 0 && !error && (
            <div className="my-auto">
              <EmptyState message="No products matched your search!" />
            </div>
          )}

          {error && <ErrorState error={error} />}

          {!loading && !error && products.length > 0 && (
            <ProductList products={products} />
          )}

          {!loading && !error && products.length > 0 && (
            <div className="w-full mt-auto pt-4">
              <Pagination totalProducts={totalProducts} />
            </div>
          )}
        </div>

        {isDetailsRoute && (
          <div className="w-full sticky top-24 flex items-start justify-center min-h-[90vh] bg-card border border-border/80 p-5 md:p-6 rounded-2xl shadow-sm transition-all duration-300">
            <div className="w-full h-full">
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
