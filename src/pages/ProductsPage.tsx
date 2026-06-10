import { ErrorState } from '../components/ErrorState.tsx';
import ProductList from '../components/ProductList/ProductList.tsx';
import { EmptyState } from '../components/EmptyState.tsx';
import {
  Outlet,
  useMatch,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import Pagination from '../components/Pagination/Pagination.tsx';
import useLocalStorage from '../hooks/useLocalStorage.ts';
import { API_PRODUCTS_LIMIT, ROUTE_PATHS } from '../constants/index.ts';
import { api, useGetProductsQuery } from '../services/api.ts';
import Loader from '../components/Loader.tsx';
import { getRtkErrorMessage } from '../utils/getRtkErrorMessage.ts';
import Search from '../components/Search/Search.tsx';
import { RefreshCw } from 'lucide-react';
import { useAppDispatch } from '../store/hooks.ts';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const page = Number(searchParams.get('page')) || 1;
  const skip = (page - 1) * API_PRODUCTS_LIMIT;

  const { data, isFetching, isLoading, isError, error } = useGetProductsQuery({
    search: searchQuery,
    skip,
  });
  const products = data?.products ?? [];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    setSearchParams(params);
    navigate('/products');
  };

  const handleInvalidateCache = () => {
    dispatch(
      api.util.invalidateTags([
        { type: 'Products', id: 'LIST' },
        { type: 'Products' },
      ])
    );
  };

  const isDetailsRoute = useMatch(ROUTE_PATHS.PRODUCT_DETAILS);

  const hasNoProducts = !isFetching && !isError && products.length === 0;
  const hasProducts = !isFetching && !isError && products.length > 0;

  const errorMessage = getRtkErrorMessage(error);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1">
          <Search searchQuery={searchQuery} onSearch={handleSearch} />
        </div>

        <button
          data-testid="refresh-button"
          className={`${
            isFetching || isLoading ? 'opacity-60' : ''
          } p-3 cursor-pointer bg-card border border-border/80 text-text-secondary hover:text-foreground hover:bg-background-secondary rounded-xl transition-all duration-200 shadow-xs active:scale-95 flex items-center justify-center h-11.5 w-11.5`}
          onClick={handleInvalidateCache}
          aria-label="Refresh list"
          title="Refresh Product Data"
          disabled={isFetching || isLoading}
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div
        className={`relative w-full ${
          isDetailsRoute
            ? 'grid lg:grid-cols-[1.6fr_1fr] gap-6 items-start'
            : 'flex flex-col'
        }`}
      >
        <div className="w-full flex flex-col items-center justify-start bg-card border border-border/80 rounded-2xl p-2 shadow-xs min-h-[90vh]">
          {isFetching && <Loader message="Loading products..." />}

          {isError && <ErrorState error={errorMessage} />}

          {hasNoProducts && (
            <div className="my-auto">
              <EmptyState message="No products matched your search!" />
            </div>
          )}

          {hasProducts && <ProductList products={products} />}

          {hasProducts && data?.total && (
            <div className="w-full mt-auto pt-4">
              <Pagination totalProducts={data.total} />
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
