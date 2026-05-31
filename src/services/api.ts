import {
  API_PRODUCTS_LIMIT,
  API_SELECT_FIELDS,
  API_SELECT_FIELDS_DETAILS,
} from '../constants/index.ts';
import type {
  ProductDetailsType,
  ProductsApiResponse,
} from '../types/types.ts';

const API_URL = import.meta.env.VITE_API_BASE_URL;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),

  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductsApiResponse,
      {
        search?: string;
        skip?: number;
        select?: string;
      }
    >({
      query: ({ search = '', skip = 0, select = API_SELECT_FIELDS }) => {
        const base = search ? `products/search` : `products`;

        const params = new URLSearchParams();

        if (search) params.append('q', search);
        params.append('limit', String(API_PRODUCTS_LIMIT));
        params.append('select', String(select));
        params.append('skip', String(skip));

        return `${base}?${params.toString()}`;
      },
    }),
    getProduct: builder.query<ProductDetailsType, string | number>({
      query: (id) => {
        const params = new URLSearchParams();

        params.append('select', String(API_SELECT_FIELDS_DETAILS));
        return `products/${id}?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetProductsQuery } = api;
export const { useGetProductQuery } = api;
