import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../../pages/NotFound';

const renderPage = () => {
  return {
    user: userEvent.setup(),
    ...render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    ),
  };
};

describe('NotFound page', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render main UI elements', () => {
    renderPage();

    expect(
      screen.getByText('Requested Resource Not Found')
    ).toBeInTheDocument();

    expect(
      screen.getByText(/the requested item could not be retrieved/i)
    ).toBeInTheDocument();

    expect(screen.getByAltText('Page not found')).toBeInTheDocument();
  });

  it('should render image with correct src', () => {
    renderPage();

    const img = screen.getByAltText('Page not found');

    expect(img).toHaveAttribute('src', '/assets/page-not-found.svg');
  });

  it('should navigate home via Link', () => {
    renderPage();

    const link = screen.getByRole('link', { name: /go to home/i });

    expect(link).toHaveAttribute('href', '/');
  });

  it('should call window.history.back when Go Back is clicked', async () => {
    const { user } = renderPage();

    const backSpy = vi
      .spyOn(window.history, 'back')
      .mockImplementation(() => {});

    await user.click(screen.getByRole('button', { name: /go back/i }));

    expect(backSpy).toHaveBeenCalledTimes(1);
  });

  it('should render both buttons', () => {
    renderPage();

    expect(
      screen.getByRole('link', { name: /go to home/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /go back/i })
    ).toBeInTheDocument();
  });
});
