import { render, screen } from '@testing-library/react';
import Loader from '../../src/components/loader/Loader';

describe('Loader', () => {
  it('should render loader component', () => {
    render(<Loader />);

    const loader = screen.getByRole('status');

    expect(loader).toBeInTheDocument();
  });

  it('has appropriate ARIA attributes for screen readers', () => {
    render(<Loader />);

    const loader = screen.getByRole('status');

    expect(loader).toHaveAccessibleName(/loading/i);
  });
});
