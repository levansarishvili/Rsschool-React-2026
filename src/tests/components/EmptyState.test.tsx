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
    expect(img).toHaveAttribute('alt', 'No products found');
  });

  it('should fallback to default message text when the message prop is an empty string', () => {
    render(<EmptyState message="" />);

    const fallbackText = screen.getByText(
      /we couldn't find anything matching your current selection/i
    );
    expect(fallbackText).toBeInTheDocument();
  });

  it('should always render the static heading title element', () => {
    render(<EmptyState message="Custom dynamic message payload" />);

    const heading = screen.getByRole('heading', {
      name: /no products found/i,
      level: 3,
    });
    expect(heading).toBeInTheDocument();
  });

  it('should present the illustrative element accessibly via image queries', () => {
    render(<EmptyState message="Testing accessibility layers" />);

    const accessibleImage = screen.getByAltText('No products found');
    expect(accessibleImage).toBeInTheDocument();
  });
});
