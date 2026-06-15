import { api } from '../services/api.ts';
import { configureStore } from '@reduxjs/toolkit';
import shopReducer from '../store/shopSlice.ts';

export const createTestStore = () =>
  configureStore({
    reducer: {
      shop: shopReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
