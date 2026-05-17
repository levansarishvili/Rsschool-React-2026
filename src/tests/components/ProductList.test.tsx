import { render, screen } from '@testing-library/react';
import { mockProducts } from '../../test-utils/mocks/productsMockData';
import ProductList from '../../components/ProductList/ProductList';
import { MemoryRouter } from 'react-router-dom';

describe('ProductList', () => {
  it('should render correct number of items when data is provided', () => {
    render(
      <MemoryRouter>
        <ProductList products={mockProducts} />
      </MemoryRouter>
    );

    const products = screen.getAllByRole('article');

    expect(products).toHaveLength(mockProducts.length);
  });
});
