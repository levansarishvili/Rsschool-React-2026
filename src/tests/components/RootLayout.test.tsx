import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RootLayout from '../../components/layout/RootLayout';
import { ThemeProvider } from '../../contexts/ThemeProvider';
import { Provider } from 'react-redux';
import store from '../../store/store';

vi.mock('../../components/Header.tsx', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

vi.mock('../../components/Footer.tsx', () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

function renderLayout() {
  return render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<div data-testid="child">Page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
}

describe('RootLayout', () => {
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
