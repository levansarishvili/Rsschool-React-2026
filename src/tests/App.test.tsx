import { render, screen } from '@testing-library/react';
import App from '../App';
import { server } from '../test-utils/mocks/server';
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';

const API_URL = import.meta.env.VITE_API_BASE_URL;

describe('App', () => {
  it('should render loader initially', () => {
    render(<App />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should hide loader after data loads', async () => {
    render(<App />);

    expect(screen.getByRole('status')).toBeInTheDocument();

    await screen.findByText(/iphone 16/i);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should render fetched products', async () => {
    render(<App />);

    expect(await screen.findByText(/iphone 16/i)).toBeInTheDocument();
    expect(await screen.findByText(/macbook/i)).toBeInTheDocument();
  });

  it('should render empty state when no products returned', async () => {
    server.use(
      http.get(`${API_URL}products/search`, () => {
        return HttpResponse.json({
          products: [],
        });
      })
    );

    render(<App />);

    expect(await screen.findByText(/no products matched/i)).toBeInTheDocument();
  });

  it('should update products when search query changes', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'phone');

    expect(await screen.findByText(/iphone 16/i)).toBeInTheDocument();
  });

  it('should render error state on API failure', async () => {
    server.use(
      http.get(`${API_URL}products/search`, () => {
        return HttpResponse.error();
      })
    );

    render(<App />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
