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
import { API_PRODUCTS_LIMIT } from '../constants/index.ts';
import { useGetProductsQuery } from '../services/api.ts';
import { transformProducts } from '../utils/transform.ts';
import Loader from '../components/Loader.tsx';
import { getRtkErrorMessage } from '../utils/getRtkErrorMessage.ts';
import Search from '../components/Search/Search.tsx';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const navigate = useNavigate();

  const page = Number(searchParams.get('page')) || 1;
  const skip = (page - 1) * API_PRODUCTS_LIMIT;

  const { data, isLoading, isError, error } = useGetProductsQuery({
    search: searchQuery,
    skip,
  });
  const products = transformProducts(data?.products ?? []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    setSearchParams(params);
    navigate('/');
  };

  const isDetailsRoute = useMatch('/details/:id');

  const hasNoProducts = !isLoading && !isError && products.length === 0;
  const hasProducts = !isLoading && !isError && products.length > 0;

  const errorMessage = getRtkErrorMessage(error);

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
          {isLoading && <Loader message="Loading products..." />}

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
