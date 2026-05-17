import { render, screen } from '@testing-library/react';
import { Header } from '../../components/Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  const renderHeader = () =>
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

  it('should render header title', () => {
    renderHeader();
    const header = screen.getByRole('heading');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('RS-React-App');
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
});
