import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RootLayout from '../../layouts/RootLayout';

vi.mock('../../components/Header.tsx', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

vi.mock('../../components/Footer.tsx', () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

function renderLayout() {
  return render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<div data-testid="child">Page</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('RootLayout', () => {
  it('should render header', () => {
    renderLayout();

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should render footer', () => {
    renderLayout();

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should render outlet content', () => {
    renderLayout();

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should render main layout wrapper', () => {
    renderLayout();

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });
});
