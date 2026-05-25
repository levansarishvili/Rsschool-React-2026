import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ProductType } from '../types/types';

interface ShopState {
  selectedItems: ProductType[];
}

const initialState: ShopState = {
  selectedItems: [],
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    toggleItemSelection: (state, action: PayloadAction<ProductType>) => {
      const exists = state.selectedItems.some(
        (item) => item.id === action.payload.id
      );
      if (exists) {
        state.selectedItems = state.selectedItems.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.selectedItems.push(action.payload);
      }
    },
    clearAllSelections: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { toggleItemSelection, clearAllSelections } = shopSlice.actions;
export default shopSlice.reducer;
