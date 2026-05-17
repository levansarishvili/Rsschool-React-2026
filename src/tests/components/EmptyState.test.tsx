import { render, screen } from '@testing-library/react';
import { EmptyState } from '../../components/EmptyState';

describe('EmptyState', () => {
  it('should render empty state message', () => {
    render(<EmptyState message="no products matched your search" />);

    expect(
      screen.getByText(/no products matched your search/i)
    ).toBeInTheDocument();
  });

  it('should render empty state image', () => {
    render(<EmptyState message="no products matched your search" />);

    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      expect.stringContaining('assets/data-not-found.svg')
    );
    expect(img).toHaveAttribute('alt', 'Item not found');
  });
});
