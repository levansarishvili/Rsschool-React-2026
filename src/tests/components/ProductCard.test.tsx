import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockProduct } from '../../test-utils/mocks/productsMockData';
import ProductCard from '../../components/ProductCard/ProductCard';
import { MemoryRouter } from 'react-router-dom';
import type { ProductType } from '../../types/types';
import store from '../../store/store';

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
});
