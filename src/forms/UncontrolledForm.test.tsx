import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { UncontrolledForm } from './UncontrolledForm';
import { createTestStore } from '../test-utils/createTestStore';

const renderWithProvider = (ui: React.ReactElement) => {
  const store = createTestStore();

  return {
    store,
    user: userEvent.setup(),
    ...render(<Provider store={store}>{ui}</Provider>),
  };
};

describe('UncontrolledForm', () => {
  it('should submit form and update redux state', async () => {
    const onSuccess = vi.fn();

    const { store, user } = renderWithProvider(
      <UncontrolledForm onSuccess={onSuccess} />
    );

    await user.type(screen.getByLabelText(/name/i), 'John');

    await user.type(screen.getByRole('spinbutton', { name: 'Age' }), '25');
    await user.type(screen.getByLabelText(/email/i), 'john@test.com');

    const countryInput = screen.getByLabelText(/country/i);
    await user.type(countryInput, 'Georgia');

    const passwordInput = screen.getByLabelText('Password', {
      selector: 'input',
    });
    const confirmPasswordInput = screen.getByLabelText('Confirm Password', {
      selector: 'input',
    });

    await user.type(passwordInput, 'Aa1!aaaa');
    await user.type(confirmPasswordInput, 'Aa1!aaaa');

    await user.click(screen.getByRole('radio', { name: 'male' }));

    await user.click(screen.getByRole('radio', { name: 'female' }));

    await user.click(screen.getByRole('radio', { name: 'other' }));
    await user.click(screen.getByLabelText(/i accept terms/i));

    const file = new File(['dummy'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(/profile image/i);
    await user.upload(fileInput, file);

    const submitBtn = screen.getByRole('button', { name: /submit form/i });
    await user.click(submitBtn);

    await waitFor(() => {
      const state = store.getState();
      expect(state.forms.submissions.length).toBe(1);
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('should show validation errors on invalid submit', async () => {
    const { user } = renderWithProvider(
      <UncontrolledForm onSuccess={() => {}} />
    );

    await user.click(screen.getByRole('button', { name: /submit form/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    });
  });
});
