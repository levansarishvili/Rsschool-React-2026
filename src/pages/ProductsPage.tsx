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
    <div className="flex flex-col gap-8 font-mono text-foreground w-full min-h-screen selection:bg-accent selection:text-background">
      <Search searchQuery={searchQuery} onSearch={handleSearch} />

      <div
        className={`relative w-full ${
          isDetailsRoute
            ? 'grid lg:grid-cols-[1.5fr_1fr] gap-6 items-start'
            : 'flex flex-col'
        }`}
      >
        <div className="flex flex-col gap-8 items-center justify-start border-2 border-foreground bg-surface p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(43,41,39,1)] dark:shadow-[4px_4px_0px_0px_rgba(244,239,226,1)] min-h-[70vh]">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 my-auto">
              <span className="text-xs font-black uppercase tracking-wider mt-4 animate-pulse">
                Loading Products Data...
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
            <div className="w-full mt-auto pt-6 border-t-2 border-dashed border-foreground/20">
              <Pagination totalProducts={totalProducts} />
            </div>
          )}
        </div>

        {isDetailsRoute && (
          <div
            className="w-full sticky top-24 flex items-center justify-center min-h-[75vh]
              bg-background border lg:border-2 border-foreground p-1
              shadow-[4px_4px_0px_0px_rgba(43,41,39,1)] dark:shadow-[4px_4px_0px_0px_rgba(244,239,226,1)]
              transition-none"
          >
            <div className="p-2 h-full">
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
