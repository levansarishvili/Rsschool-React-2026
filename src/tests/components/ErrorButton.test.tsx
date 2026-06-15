import { render, screen } from '@testing-library/react';
import ErrorButton from '../../components/ErrorButton';
import userEvent from '@testing-library/user-event';

describe('ErrorButton', () => {
  it('renders error button', () => {
    render(<ErrorButton />);

    expect(
      screen.getByRole('button', { name: /trigger test error/i })
    ).toBeInTheDocument();
  });

  it('should throw error when clicked', async () => {
    const user = userEvent.setup();

    render(<ErrorButton />);

    const button = screen.getByRole('button', {
      name: /trigger test error/i,
    });

    await expect(user.click(button)).rejects.toThrow(/simulated render crash/i);
  });
});
