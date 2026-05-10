import { render, screen } from '@testing-library/react';
import { mockProducts } from '../../test-utils/mocks/productsMockData';
import ProductList from '../../components/ProductList/ProductList';

describe('ProductList', () => {
  it('should render correct number of items when data is provided', () => {
    render(<ProductList products={mockProducts} />);

    const products = screen.getAllByRole('article');

    expect(products).toHaveLength(mockProducts.length);
  });
});
