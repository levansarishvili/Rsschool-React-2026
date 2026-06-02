import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createTestStore } from '../../test-utils/createTestStore';
import ProductsPage from '../../pages/ProductsPage';
import {
  mockErrorResponse,
  mockProductsResponse,
} from '../../test-utils/mocks/handlers';
import { server } from '../../test-utils/mocks/server';
import { api } from '../../services/api';
import * as apiHooks from '../../services/api';

describe('ProductsPage', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    window.localStorage.clear();
    store = createTestStore();
  });

  afterEach(() => {
    server.resetHandlers();
    store.dispatch(api.util.resetApiState());
    vi.restoreAllMocks();
  });

  const renderProductPage = (initialEntries = ['/']) => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/" element={<ProductsPage />}>
              <Route
                path="details/:id"
                element={
                  <div data-testid="mock-outlet">Details Panel Content</div>
                }
              />
            </Route>
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

  it('should disable refresh button while fetching or loading data', () => {
    vi.spyOn(apiHooks, 'useGetProductsQuery').mockReturnValue({
      data: null,
      isFetching: true,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderProductPage();

    const refreshButton = screen.getByTestId('refresh-button');
    expect(refreshButton).toBeDisabled();
    expect(refreshButton).toHaveClass('opacity-60');
  });

  it('should change layout styling and render the details Outlet when matching details route path', async () => {
    renderProductPage(['/details/1']);

    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
    expect(
      screen.getByTestId('mock-outlet').parentElement?.parentElement
    ).toHaveClass('sticky');
  });
});
