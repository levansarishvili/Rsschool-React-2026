import { render, screen } from '@testing-library/react';
import { Header } from '../../components/layout/Header';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../contexts/ThemeProvider';

describe('Header', () => {
  const renderHeader = () =>
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>
    );

  it('should render header title', () => {
    renderHeader();
    const header = screen.getByRole('heading');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('RS_STORE');
  });

  it('should render navigation links', () => {
    renderHeader();

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('should mark Home link as active on home page', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/']}>
          <Header />
        </MemoryRouter>
      </ThemeProvider>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });

    expect(homeLink).toHaveClass('text-primary');
    expect(homeLink).toHaveClass('font-semibold');
  });

  it('should mark About link as active on about page', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/about']}>
          <Header />
        </MemoryRouter>
      </ThemeProvider>
    );

    const aboutLink = screen.getByRole('link', { name: /about/i });

    expect(aboutLink).toHaveClass('text-primary');
    expect(aboutLink).toHaveClass('font-semibold');
  });
});
