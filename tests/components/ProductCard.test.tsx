import { render, screen } from '@testing-library/react';
import ProductCard from '../../src/components/ProductCard/ProductCard';
import { mockProduct } from '../../src/test-utils/mocks/productsMockData';

describe('ProductCard', () => {
  it('should render product name', () => {
    render(<ProductCard productObj={mockProduct} />);

    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should render product image with correct src and alt attribute', () => {
    render(<ProductCard productObj={mockProduct} />);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockProduct.image);
    expect(img).toHaveAttribute('alt', mockProduct.name);

    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should render product price correctly', () => {
    render(<ProductCard productObj={mockProduct} />);

    expect(screen.getByText('$300')).toBeInTheDocument();
  });

  it('should render product description correctly', () => {
    render(<ProductCard productObj={mockProduct} />);

    expect(screen.getByText(/product description/i)).toBeInTheDocument();
  });

  it('should render the correct number of rating stars', () => {
    render(<ProductCard productObj={mockProduct} />);

    const stars = screen.getAllByTestId('star-icon');
    const expectedStars = Math.round(mockProduct.rating);

    expect(stars.length).toBe(expectedStars);
  });

  it('should handle missing props gracefully', () => {
    const incompleteProduct = {
      id: 1,
      image: '',
      name: '',
      description: '',
      price: 0,
      rating: 0,
    };
    render(<ProductCard productObj={incompleteProduct} />);

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
