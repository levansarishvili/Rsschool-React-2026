import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockProduct } from '../../test-utils/mocks/productsMockData';
import ProductCard from '../../components/ProductCard/ProductCard';
import { MemoryRouter } from 'react-router-dom';
import type { ProductType } from '../../types/types';
import store from '../../store/store';
import userEvent from '@testing-library/user-event';

describe('ProductCard', () => {
  const renderProductCard = (productObj: ProductType) => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard productObj={productObj} />
        </MemoryRouter>
      </Provider>
    );
  };

  it('should render product name', () => {
    renderProductCard(mockProduct);

    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should render product image with correct src and alt attribute', () => {
    renderProductCard(mockProduct);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockProduct.thumbnail);
    expect(img).toHaveAttribute('alt', mockProduct.title);

    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should render product price correctly', () => {
    renderProductCard(mockProduct);

    expect(screen.getByText('$300')).toBeInTheDocument();
  });

  it('should render product description correctly', () => {
    renderProductCard(mockProduct);

    expect(screen.getByText(/product description/i)).toBeInTheDocument();
  });

  it('should handle missing props gracefully', () => {
    const incompleteProduct = {
      id: 1,
      thumbnail: '',
      title: '',
      description: '',
      price: 0,
      rating: 0,
    };
    renderProductCard(incompleteProduct);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      './assets/placeholder.png'
    );
    expect(screen.queryByTestId('star-icon')).not.toBeInTheDocument();
    expect(screen.queryByText(/product description/i)).not.toBeInTheDocument();
    expect(screen.queryByText('$300')).not.toBeInTheDocument();
  });

  it('should navigate to product details page', () => {
    renderProductCard(mockProduct);

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', `/products/${mockProduct.id}`);
  });

  it('should render product id', () => {
    renderProductCard(mockProduct);

    expect(screen.getByText(`ID: #${mockProduct.id}`)).toBeInTheDocument();
  });

  it('should render product checkbox', () => {
    renderProductCard(mockProduct);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should toggle checkbox when clicked', async () => {
    const user = userEvent.setup();

    renderProductCard(mockProduct);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('should render rating stars', () => {
    renderProductCard(mockProduct);

    expect(screen.getByTestId('rating-stars')).toBeInTheDocument();
  });
});
