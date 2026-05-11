import { render, screen } from '@testing-library/react';
import { EmptyState } from '../../components/EmptyState';

describe('EmptyState', () => {
  it('should render empty state message', () => {
    render(<EmptyState />);

    expect(
      screen.getByText(/no products matched your search/i)
    ).toBeInTheDocument();
  });

  it('should render empty state image', () => {
    render(<EmptyState />);

    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', './assets/data-not-found.svg');
    expect(img).toHaveAttribute('alt', 'Item not found');
  });
});
