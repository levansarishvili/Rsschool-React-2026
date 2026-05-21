import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import { useSearchParams } from 'react-router-dom';
import { API_PRODUCTS_LIMIT } from '../constants';
import type { AppState } from '../types/types';
import { transformProducts } from '../utils/transform';
import { fetchProductsApi } from '../services/api';

export function useProducts() {
  const [savedQuery, setSavedQuery] = useLocalStorage('searchQuery', '');
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const skip = (page - 1) * API_PRODUCTS_LIMIT;

  const [appState, setAppState] = useState<AppState>({
    products: [],
    loading: true,
    error: null,
    searchQuery: savedQuery,
    totalProducts: 0,
  });

  const fetchProducts = async (query: string, skip = 0) => {
    try {
      setAppState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      const { products, total } = await fetchProductsApi(query, skip);

      setAppState((prev) => ({
        ...prev,
        products: transformProducts(products),
        totalProducts: total,
        loading: false,
      }));
    } catch (error) {
      setAppState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  };

  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          params.set('page', '1');
          return params;
        },
        { replace: true }
      );
    }
  }, []);

  useEffect(() => {
    fetchProducts(appState.searchQuery, skip);
  }, [appState.searchQuery, skip]);

  const handleSearch = (query: string) => {
    setSavedQuery(query);

    setAppState((prev) => ({
      ...prev,
      searchQuery: query,
    }));

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    setSearchParams(params);
  };

  return {
    ...appState,
    page,
    handleSearch,
  };
}
