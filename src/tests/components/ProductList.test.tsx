import { render, screen } from '@testing-library/react';
import { mockProducts } from '../../test-utils/mocks/productsMockData';
import ProductList from '../../components/ProductList/ProductList';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';

describe('ProductList', () => {
  it('should render correct number of items when data is provided', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductList products={mockProducts} />
        </MemoryRouter>
      </Provider>
    );

    const products = screen.getAllByRole('article');

    expect(products).toHaveLength(mockProducts.length);
  });
});
