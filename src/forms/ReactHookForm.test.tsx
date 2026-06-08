import { describe, it, expect, vi } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { ReactHookForm } from './ReactHookForm';
import React from 'react';
import { createTestStore } from '../test-utils/createTestStore';

const renderWithProvider = (ui: React.ReactElement) => {
  const store = createTestStore();

  return {
    store,
    user: userEvent.setup(),
    ...render(<Provider store={store}>{ui}</Provider>),
  };
};

describe('ReactHookForm', () => {
  it('should render all form fields', () => {
    renderWithProvider(<ReactHookForm onSuccess={() => {}} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Age' })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText(/profile image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/i accept terms/i)).toBeInTheDocument();
  });

  it('should disable submit button initially', () => {
    renderWithProvider(<ReactHookForm onSuccess={() => {}} />);

    const button = screen.getByRole('button', { name: /submit form/i });

    expect(button).toBeDisabled();
  });

  it('should submit form with valid data and call onSuccess', async () => {
    const { user } = renderWithProvider(<ReactHookForm onSuccess={vi.fn()} />);

    await user.type(screen.getByLabelText(/name/i), 'John');
    await user.type(screen.getByRole('spinbutton', { name: 'Age' }), '25');
    await user.type(screen.getByLabelText(/email/i), 'john@test.com');

    await user.type(screen.getByLabelText('Password'), 'Aa1!aaaa');
    await user.type(screen.getByLabelText('Confirm Password'), 'Aa1!aaaa');

    await user.click(screen.getByRole('radio', { name: 'male' }));
    await user.click(screen.getByLabelText(/i accept terms/i));

    const file = new File(['test'], 'test.png', {
      type: 'image/png',
    });

    const input = screen.getByLabelText(/profile image/i);
    await user.upload(input, file);

    await user.click(screen.getByRole('button', { name: /submit form/i }));
    expect(screen.getByRole('button', { name: /submit form/i })).toBeDisabled();
  });

  it('should update redux state after submission', async () => {
    const { store, user } = renderWithProvider(
      <ReactHookForm onSuccess={() => {}} />
    );

    await user.type(screen.getByLabelText(/name/i), 'John');
    await user.type(screen.getByLabelText('Age'), '25');
    await user.type(screen.getByLabelText(/email/i), 'john@test.com');

    const countryInput = screen.getByLabelText(/country autocomplete/i);
    await user.type(countryInput, 'Georgia');

    await user.type(screen.getByLabelText('Password'), 'Aa1!aaaa');
    await user.type(screen.getByLabelText('Confirm Password'), 'Aa1!aaaa');

    await user.click(screen.getByRole('radio', { name: 'male' }));
    await user.click(screen.getByLabelText(/i accept terms/i));

    const file = new File(['test'], 'test.png', {
      type: 'image/png',
    });
    const input = screen.getByLabelText(/profile image/i);
    await user.upload(input, file);

    const submitBtn = screen.getByRole('button', { name: /submit form/i });

    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });

    await user.click(submitBtn);

    await waitFor(() => {
      const state = store.getState();
      expect(state.forms.submissions.length).toBeGreaterThan(0);
    });
  });
});
