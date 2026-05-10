import { render, screen } from '@testing-library/react';
import ProductList from '../../src/components/ProductList/ProductList';
import { mockProducts } from '../../src/test-utils/mocks/productsMockData';

describe('ProductList', () => {
  it('should render correct number of items when data is provided', () => {
    render(<ProductList products={mockProducts} />);

    const products = screen.getAllByRole('article');

    expect(products).toHaveLength(mockProducts.length);
  });
});
