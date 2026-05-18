import { useEffect, useState } from 'react';
import type { AppState } from '../types/types.ts';
import useLocalStorage from '../hooks/useLocalStorage.ts';
import { fetchProductsApi } from '../services/api.ts';
import { transformProducts } from '../utils/transform.ts';
import {
  API_PRODUCTS_LIMIT,
  DEFAULT_SEARCH_QUERY,
} from '../constants/index.ts';
import Loader from '../components/loader/Loader.tsx';
import { ErrorState } from '../components/ErrorState.tsx';
import ProductList from '../components/ProductList/ProductList.tsx';
import { EmptyState } from '../components/EmptyState.tsx';
import {
  Outlet,
  useMatch,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import Search from '../components/Search/Search.tsx';
import Pagination from '../components/Pagination/Pagination.tsx';

export default function ProductsPage() {
  const initialState: AppState = {
    products: [],
    loading: true,
    error: null,
    searchQuery: '',
    totalProducts: 0,
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get('page')) || 1;
  const skip = (page - 1) * API_PRODUCTS_LIMIT;

  const [appState, setAppState] = useState(initialState);
  const [savedQuery] = useLocalStorage('searchQuery', '');

  const isDetailsRoute = useMatch('/details/:id');

  const fetchProducts = async (query = DEFAULT_SEARCH_QUERY, skip = 0) => {
    setAppState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const { products, total } = await fetchProductsApi(query, skip);
      const productsData = transformProducts(products);

      setAppState((prev) => ({
        ...prev,
        products: productsData || [],
        loading: false,
        totalProducts: total,
      }));
    } catch (error) {
      let errorMessage = 'Unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('Fetch error:', errorMessage);

      setAppState((prev) => ({ ...prev, error: errorMessage, loading: false }));
    }
  };

  useEffect(() => {
    async function loadProducts() {
      await fetchProducts(savedQuery || DEFAULT_SEARCH_QUERY, skip);
    }

    loadProducts();
  }, [savedQuery, skip]);

  useEffect(() => {
    const page = searchParams.get('page');

    if (!page) {
      const params = new URLSearchParams(searchParams);

      params.set('page', '1');

      setSearchParams(params, { replace: true });
    }
  }, []);

  const handleSearch = (query: string) => {
    setAppState((prev) => ({ ...prev, searchQuery: query, loading: true }));
    fetchProducts(query);
    handleResetPagination();
    navigate('/');
  };

  const handleResetPagination = () => {
    const params = searchParams;

    params.set('page', '1');

    setSearchParams(params);
  };

  const { products, loading, error, searchQuery } = appState;

  return (
    <div className="flex flex-col gap-10 font-inter text-base bg-gray-50 w-full min-h-screen">
      <Search searchQuery={searchQuery} onSearch={handleSearch} />

      <div
        className={`relative min-h-screen w-full ${isDetailsRoute ? 'grid md:grid-cols-[2fr_1fr] gap-10' : ''}`}
      >
        <div className="min-h-screen flex flex-col gap-12 items-center justify-center">
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
            <Pagination totalProducts={appState.totalProducts} />
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
