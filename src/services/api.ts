import {
  API_SELECT_FIELDS,
  API_SELECT_FIELDS_DETAILS,
  DEFAULT_SEARCH_QUERY,
} from '../constants/index.ts';
import type {
  ProductDetailsType,
  ProductsApiResponse,
} from '../types/types.ts';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProductsApi = async (
  query = DEFAULT_SEARCH_QUERY
): Promise<ProductsApiResponse> => {
  const response = await fetch(
    `${API_URL}products/search?q=${encodeURIComponent(query)}&limit=12&select=${API_SELECT_FIELDS}`
  );

  if (!response.ok) {
    throw new Error(
      `${response.status} (${response.statusText}): Unable to fetch products for "${query}".`
    );
  }

  return await response.json();
};

export const fetchProductApi = async (
  id: string | undefined
): Promise<ProductDetailsType> => {
  const response = await fetch(
    `${API_URL}products/${id}?select=${API_SELECT_FIELDS_DETAILS}`
  );

  if (!response.ok) {
    throw new Error(
      `${response.status} (${response.statusText}): Unable to fetch product with that ID.`
    );
  }

  return await response.json();
};
