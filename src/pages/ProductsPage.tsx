import { useEffect, useState } from 'react';
import type { AppState } from '../types/types.ts';
import useLocalStorage from '../hooks/useLocalStorage.ts';
import { fetchProductsApi } from '../services/api.ts';
import { transformProducts } from '../utils/transform.ts';
import { DEFAULT_SEARCH_QUERY } from '../constants/index.ts';
import Loader from '../components/loader/Loader.tsx';
import { ErrorState } from '../components/ErrorState.tsx';
import ProductList from '../components/ProductList/ProductList.tsx';
import { EmptyState } from '../components/EmptyState.tsx';
import { Outlet, useMatch } from 'react-router-dom';
import Search from '../components/Search/Search.tsx';

export default function App() {
  const initialState: AppState = {
    products: [],
    loading: true,
    error: null,
    searchQuery: '',
  };

  const [appState, setAppState] = useState(initialState);
  const [savedQuery] = useLocalStorage('searchQuery', '');

  const isDetailsRoute = useMatch('/details/:id');

  const fetchProducts = async (query = DEFAULT_SEARCH_QUERY) => {
    setAppState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const { products } = await fetchProductsApi(query);
      const productsData = transformProducts(products);

      setAppState((prev) => ({
        ...prev,
        products: productsData || [],
        loading: false,
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
      await fetchProducts(savedQuery || DEFAULT_SEARCH_QUERY);
    }

    loadProducts();
  }, [savedQuery]);

  const handleSearch = (query: string) => {
    setAppState((prev) => ({ ...prev, searchQuery: query, loading: true }));
    fetchProducts(query);
  };

  const { products, loading, error, searchQuery } = appState;

  return (
    <div className="flex flex-col gap-10 font-inter text-base bg-gray-50 w-full min-h-screen">
      <Search searchQuery={searchQuery} onSearch={handleSearch} />

      <div
        className={`relative min-h-screen w-full ${isDetailsRoute ? 'grid grid-cols-[2fr_1fr] gap-10' : ''}`}
      >
        <div className="min-h-screen flex justify-center items-start">
          {loading && <Loader />}

          {!loading && products.length === 0 && !error && (
            <EmptyState message="No products matched your search!" />
          )}

          {error && <ErrorState error={error} />}

          {!loading && !error && products.length > 0 && (
            <ProductList products={products} />
          )}
        </div>

        {isDetailsRoute && (
          <div
            className="
              flex justify-center items-center
              w-full sticky top-20 max-h-screen
              bg-white rounded-xs border border-gray-200 p-6
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
