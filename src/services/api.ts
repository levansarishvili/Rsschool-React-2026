import { DEFAULT_SEARCH_QUERY } from '../constants/index.ts';
import type { ProductsApiResponse } from '../types/types.ts';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProductsApi = async (
  query = DEFAULT_SEARCH_QUERY
): Promise<ProductsApiResponse> => {
  const response = await fetch(
    `${API_URL}products/search?q=${encodeURIComponent(query)}&limit=12`
  );

  if (!response.ok) {
    throw new Error(
      `${response.status} (${response.statusText}): Unable to fetch products for "${query}".`
    );
  }

  return await response.json();
};
