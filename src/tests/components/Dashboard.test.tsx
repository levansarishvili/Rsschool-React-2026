import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Dashboard } from '../../components/Dashboard';
import { createTestStore } from '../../test-utils/createTestStore';

const renderWithProvider = () => {
  const store = createTestStore();

  return {
    store,
    user: userEvent.setup(),
    ...render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    ),
  };
};

describe('Dashboard', () => {
  it('should render dashboard header and buttons', () => {
    renderWithProvider();

    expect(screen.getByText(/react forms/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /uncontrolled form/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /react hook form/i })
    ).toBeInTheDocument();
  });

  it('should open uncontrolled form modal', async () => {
    const { user } = renderWithProvider();

    await user.click(
      screen.getByRole('button', { name: /uncontrolled form/i })
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByText(/submission via uncontrolled form/i)
    ).toBeInTheDocument();
  });

  it('should open RHF modal', async () => {
    const { user } = renderWithProvider();

    await user.click(screen.getByRole('button', { name: /react hook form/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByText(/submission via react hook form/i)
    ).toBeInTheDocument();
  });

  it('should close modal on backdrop click (integration check)', async () => {
    const { user } = renderWithProvider();

    await user.click(
      screen.getByRole('button', { name: /uncontrolled form/i })
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const dialog = screen.getByRole('dialog');
    await user.click(dialog);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should show empty state when no submissions', () => {
    renderWithProvider();

    expect(
      screen.getByText(/no dynamic responses collected yet/i)
    ).toBeInTheDocument();
  });
});
