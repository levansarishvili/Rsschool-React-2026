import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, describe, vi, type Mock } from 'vitest';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import { useTheme } from '../../hooks/useTheme';

vi.mock('../../hooks/useTheme', () => ({
  useTheme: vi.fn(() => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  })),
}));

describe('ThemeSwitcher Component', () => {
  const renderThemeSwitcher = () => {
    render(<ThemeSwitcher />);
  };

  it('should render theme switcher button', () => {
    renderThemeSwitcher();
    expect(
      screen.getByRole('button', { name: /toggle theme/i })
    ).toBeInTheDocument();
  });

  it('should call toggleTheme on click', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();

    (useTheme as Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggle,
    });

    renderThemeSwitcher();
    await user.click(screen.getByRole('button'));

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('should show sun icon in light mode', () => {
    (useTheme as Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    renderThemeSwitcher();
    expect(screen.getByText('☀️')).toBeInTheDocument();
  });

  it('should show moon icon in dark mode', () => {
    (useTheme as Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: vi.fn(),
    });

    renderThemeSwitcher();
    expect(screen.getByText('🌙')).toBeInTheDocument();
  });
});
