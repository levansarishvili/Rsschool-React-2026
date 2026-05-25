import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import type { ProductType } from '../../types/types';

import { SelectionFlyout } from '../../components/SelectionFlyout';
import shopReducer from '../../store/shopSlice';

import * as csv from '../../utils/csvDownloader';
import {
  mockProduct,
  mockProducts,
} from '../../test-utils/mocks/productsMockData';
import type { RootState } from '../../store/store';
vi.mock('../../utils/csvDownloader', () => ({
  downloadItemsAsCSV: vi.fn(),
}));

const createStore = (selectedItems: ProductType[]) =>
  configureStore({
    reducer: {
      shop: shopReducer,
    },
    preloadedState: {
      shop: {
        selectedItems,
      } as RootState['shop'],
    },
  });

const renderFlyout = (selectedItems: ProductType[]) => {
  const store = createStore(selectedItems);

  return render(
    <Provider store={store}>
      <SelectionFlyout />
    </Provider>
  );
};

describe('SelectionFlyout', () => {
  it('should not render when no items selected', () => {
    renderFlyout([]);

    expect(screen.queryByText(/active selection/i)).not.toBeInTheDocument();
  });

  it('should render selected items count', () => {
    renderFlyout(mockProducts);

    expect(screen.getByText(/total selected products/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should dispatch clear all action', async () => {
    const user = userEvent.setup();

    const store = createStore([mockProduct]);

    render(
      <Provider store={store}>
        <SelectionFlyout />
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: /clear all/i }));

    const state = store.getState();

    expect(state.shop.selectedItems.length).toBe(0);
  });

  it('should download CSV when clicking button', async () => {
    const user = userEvent.setup();

    renderFlyout([mockProduct]);

    await user.click(screen.getByRole('button', { name: /download csv/i }));

    expect(csv.downloadItemsAsCSV).toHaveBeenCalledTimes(1);
  });
});
