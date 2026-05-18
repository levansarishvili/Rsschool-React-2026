import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailsPage from '../../../pages/DetailsPage';
import { mockProductErrorResponse } from '../../../test-utils/mocks/handlers';

describe('DetailsPage', () => {
  it('should render product details from API', async () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Iphone 16')).toBeInTheDocument();

    expect(screen.getByText('Smartphone')).toBeInTheDocument();

    expect(screen.getByText('$300')).toBeInTheDocument();

    expect(screen.getByText(/Apple/i)).toBeInTheDocument();
  });

  it('should render loader initially', () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should render error state on failed request', async () => {
    mockProductErrorResponse();

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
