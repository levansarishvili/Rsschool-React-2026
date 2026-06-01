import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailsPage from '../../../pages/DetailsPage';
import { mockProductErrorResponse } from '../../../test-utils/mocks/handlers';
import { createTestStore } from '../../../test-utils/createTestStore';
import { Provider } from 'react-redux';

describe('DetailsPage', () => {
  const renderDetailsPanel = () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/1']}>
          <Routes>
            <Route path="/details/:id" element={<DetailsPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  it('should render product details from API', async () => {
    renderDetailsPanel();

    expect(await screen.findByText('Iphone 16')).toBeInTheDocument();

    expect(screen.getByText('Smartphone')).toBeInTheDocument();

    expect(screen.getByText('$300')).toBeInTheDocument();

    expect(screen.getByText(/Apple/i)).toBeInTheDocument();
  });

  it('should render loader initially', () => {
    renderDetailsPanel();

    expect(screen.getByText('Loading Product Details...')).toBeInTheDocument();
  });

  it('should render error state on failed request', async () => {
    mockProductErrorResponse();

    renderDetailsPanel();

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
