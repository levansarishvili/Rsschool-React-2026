import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { createTestStore } from '../../../test-utils/createTestStore';
import ProductsPage from '../../../pages/ProductsPage';
import {
  mockErrorResponse,
  mockProductsResponse,
} from '../../../test-utils/mocks/handlers';
import { server } from '../../../test-utils/mocks/server';
import { api } from '../../../services/api';
import { mockProducts } from '../../../test-utils/mocks/productsMockData';

describe('ProductsPage', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    window.localStorage.clear();
    store = createTestStore();
  });

  afterEach(() => {
    server.resetHandlers();
    store.dispatch(api.util.resetApiState());
  });

  const renderProductPage = () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  it('should render loader initially', () => {
    renderProductPage();
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('should hide loader after data loads', async () => {
    renderProductPage();
    expect(screen.getByText('Loading products...')).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByText('Loading products...')
    );
    expect(await screen.findByText(/iphone 16/i)).toBeInTheDocument();
  });

  it('should show loader again when a new search starts', async () => {
    const user = userEvent.setup();
    mockProductsResponse([], 400);

    renderProductPage();

    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'phone');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText('Loading products...')).toBeInTheDocument();
    });
  });

  it('should render fetched products', async () => {
    renderProductPage();

    expect(await screen.findByText(/iphone 16/i)).toBeInTheDocument();
    expect(await screen.findByText(/macbook/i)).toBeInTheDocument();
  });

  it('should render empty state when no products returned', async () => {
    mockProductsResponse();

    renderProductPage();

    expect(await screen.findByText(/no products matched/i)).toBeInTheDocument();
  });

  it('should update products when search query changes', async () => {
    const user = userEvent.setup();

    renderProductPage();

    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'phone');
    await user.keyboard('{Enter}');

    expect(await screen.findByText(/iphone 16/i)).toBeInTheDocument();
  });

  it('should render error state on API failure', async () => {
    mockErrorResponse();

    renderProductPage();

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
