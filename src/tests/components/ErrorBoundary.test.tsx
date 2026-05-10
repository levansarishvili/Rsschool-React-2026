import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../components/ErrorBoundary';
import userEvent from '@testing-library/user-event';

const Crash = () => {
  throw new Error('Test crash');
};

describe('ErrorBoundary', () => {
  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  it('should render fallback UI when child crashes', () => {
    render(
      <ErrorBoundary>
        <Crash />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('heading', { name: /oops! something went wrong/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/test crash/i)).toBeInTheDocument();
  });

  it('should render error image in fallback UI', () => {
    render(
      <ErrorBoundary>
        <Crash />
      </ErrorBoundary>
    );

    const img = screen.getByRole('img', { name: /Page error/i });

    expect(img).toBeInTheDocument();
  });
  it('should render reload button in fallback UI', () => {
    render(
      <ErrorBoundary>
        <Crash />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByRole('button', { name: /reload/i });

    expect(reloadButton).toBeInTheDocument();
  });

  it('should reset error state when clicking reload button', async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <ErrorBoundary key="1">
        <Crash />
      </ErrorBoundary>
    );
    const reloadButton = screen.getByRole('button', { name: /reload/i });
    await user.click(reloadButton);

    rerender(
      <ErrorBoundary key="2">
        <div>Recovered</div>
      </ErrorBoundary>
    );

    expect(screen.getByText(/recovered/i)).toBeInTheDocument();
  });

  it('should log an error when a child component crashes', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Crash />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
