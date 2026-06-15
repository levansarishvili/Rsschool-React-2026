import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../../pages/NotFound';

describe('NotFound page', () => {
  const renderNotFoundPage = () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
  };

  it('should render error title', () => {
    renderNotFoundPage();

    expect(
      screen.getByText('Requested Resource Not Found')
    ).toBeInTheDocument();
  });

  it('should render description text', () => {
    renderNotFoundPage();

    expect(
      screen.getByText(/the requested item could not be retrieved/i)
    ).toBeInTheDocument();
  });

  it('should render page not found image', () => {
    renderNotFoundPage();

    const img = screen.getByAltText('Page not found');

    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toContain('page-not-found.svg');
  });

  it('should render return home link', () => {
    renderNotFoundPage();

    const link = screen.getByRole('link', {
      name: /go to home/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
