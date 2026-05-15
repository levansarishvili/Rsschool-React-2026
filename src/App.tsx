import type { AppState } from './types/types.ts';
import Loader from './components/loader/Loader.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { EmptyState } from './components/EmptyState.tsx';
import { ErrorState } from './components/ErrorState.tsx';
import { fetchProductsApi } from './services/api.ts';
import { transformProducts } from './utils/transform.ts';
import ProductList from './components/ProductList/ProductList.tsx';
import { useEffect, useState } from 'react';
import { DEFAULT_SEARCH_QUERY } from './constants/index.ts';
import useLocalStorage from './hooks/useLocalStorage.ts';

export default function App() {
  const initialState: AppState = {
    products: [],
    loading: true,
    error: null,
    searchQuery: '',
  };

  const [appState, setAppState] = useState(initialState);
  const [savedQuery] = useLocalStorage('searchQuery', '');

  const fetchProducts = async function (query = DEFAULT_SEARCH_QUERY) {
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
    <div className="font-inter text-base bg-gray-50 w-full min-h-screen">
      <Header searchQuery={searchQuery} onSearch={handleSearch} />
      <div className="max-w-7xl mx-auto pt-4 md:pt-6 flex flex-col gap-6 md:gap-12 justify-center min-h-screen">
        <main className="relative z-0 w-full flex-1 flex justify-center items-center min-h-75 px-4 md:px-8">
          {loading && <Loader />}

          {!loading && products.length === 0 && !error && <EmptyState />}

          {error && <ErrorState error={error} />}

          {!loading && !error && products.length > 0 && (
            <ProductList products={products} />
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
