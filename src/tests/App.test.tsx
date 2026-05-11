import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import {
  mockErrorResponse,
  mockProductsResponse,
} from '../test-utils/mocks/handlers';

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

  it('should show loader again when a new search starts', async () => {
    const user = userEvent.setup();

    mockProductsResponse([], 400);

    render(<App />);

    const input = screen.getByRole('textbox');

    await user.clear(input);
    await user.type(input, 'phone');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  it('should render fetched products', async () => {
    render(<App />);

    expect(await screen.findByText(/iphone 16/i)).toBeInTheDocument();
    expect(await screen.findByText(/macbook/i)).toBeInTheDocument();
  });

  it('should render empty state when no products returned', async () => {
    mockProductsResponse();

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
    mockErrorResponse();

    render(<App />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
