import { render, screen } from '@testing-library/react';
import { ErrorState } from '../../components/ErrorState';

describe('ErrorState', () => {
  it('should render default error message when none is provided', () => {
    render(<ErrorState />);

    expect(screen.getByText(/error: unknown error/i)).toBeInTheDocument();
  });

  it('should render provided error message', () => {
    render(<ErrorState error="Something went wrong" />);

    expect(
      screen.getByText(/error: something went wrong/i)
    ).toBeInTheDocument();
  });

  it('should render error image', () => {
    render(<ErrorState />);

    const img = screen.getByRole('img', { name: 'Page error' });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', './assets/page-error.jpg');
  });
});
