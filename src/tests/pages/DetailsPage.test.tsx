import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import DetailsPage from '../../pages/DetailsPage';
import { mockProductErrorResponse } from '../../test-utils/mocks/handlers';
import { createTestStore } from '../../test-utils/createTestStore';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import * as apiHooks from '../../services/api';

const LocationDisplay = () => {
  const location = useLocation();
  return (
    <div data-testid="location-display">
      {location.search
        ? `${location.pathname}${location.search}`
        : location.pathname}
    </div>
  );
};

describe('DetailsPage', () => {
  const renderDetailsPanel = (initialRoute = '/details/1') => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
          <LocationDisplay />
        </MemoryRouter>
      </Provider>
    );
  };

  it('should render product details from API', async () => {
    renderDetailsPanel();

    expect(await screen.findByText('Iphone 16')).toBeInTheDocument();
    expect(screen.getByText('Smartphone')).toBeInTheDocument();
    expect(screen.getByText('$300')).toBeInTheDocument();
    expect(screen.getByText(/Apple/i)).toBeInTheDocument();
  });

  it('should render loader initially', () => {
    renderDetailsPanel();

    expect(screen.getByText('Loading Product Details...')).toBeInTheDocument();
  });

  it('should render error state on failed request', async () => {
    mockProductErrorResponse();

    renderDetailsPanel();

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('should render empty state when product does not exist', async () => {
    vi.spyOn(apiHooks, 'useGetProductQuery').mockReturnValue({
      data: undefined,
      isFetching: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderDetailsPanel();

    expect(
      await screen.findByText(/No product found with that ID/i)
    ).toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it('should render product image correctly', async () => {
    renderDetailsPanel();

    const image = await screen.findByRole('img');

    expect(image).toHaveAttribute(
      'src',
      'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp'
    );
    expect(image).toHaveAttribute('alt', 'Iphone 16');
  });

  it('should render stock information', async () => {
    renderDetailsPanel();

    expect(await screen.findByText('12 units')).toBeInTheDocument();
  });

  it('should render availability status', async () => {
    renderDetailsPanel();

    expect(await screen.findByText(/in stock/i)).toBeInTheDocument();
  });

  it('should render close button', async () => {
    renderDetailsPanel();

    const button = await screen.findByRole('button', {
      name: /close details/i,
    });

    expect(button).toBeInTheDocument();
  });

  it('should navigate back home and preserve search queries when close button is clicked', async () => {
    const user = userEvent.setup();
    renderDetailsPanel('/details/1?search=phone&category=smartphones');

    const button = await screen.findByRole('button', {
      name: /close details/i,
    });

    await user.click(button);

    expect(screen.getByTestId('location-display')).toHaveTextContent(
      '/?search=phone&category=smartphones'
    );
  });

  it('should fall back to "Generic" if the brand is missing', async () => {
    vi.spyOn(apiHooks, 'useGetProductQuery').mockReturnValue({
      data: {
        id: 1,
        title: 'Unknown Phone',
        brand: '',
        price: 150,
        description: 'Mystery device',
        thumbnail: 'image.png',
        stock: 5,
        rating: 3.0,
        availabilityStatus: 'Low Stock',
      },
      isFetching: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderDetailsPanel();

    expect(await screen.findByText('Generic')).toBeInTheDocument();

    vi.restoreAllMocks();
  });
});
