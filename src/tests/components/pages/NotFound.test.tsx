import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../../../pages/NotFound';

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
      screen.getByText(/route configuration parameter/i)
    ).toBeInTheDocument();
  });

  it('should render page not found image', () => {
    renderNotFoundPage();

    const img = screen.getByAltText('Page error');

    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toContain('page-not-found.svg');
  });

  it('should render return home link', () => {
    renderNotFoundPage();

    const link = screen.getByRole('link', {
      name: /return to main directory/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
