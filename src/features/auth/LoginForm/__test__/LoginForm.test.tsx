import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import LoginForm from '..';
import { FORM_VALIDATION_MESSAGE } from '@/constants';

describe('LoginForm Component', () => {
  const setup = () => {
    render(<LoginForm />);

    return {
      emailInput: screen.getByPlaceholderText('email address'),
      passwordInput: screen.getByPlaceholderText('password'),
    };
  };

  // Helper functions for filling inputs
  const fillInput = async (input: HTMLElement, value: string) => {
    fireEvent.change(input, { target: { value } });
    fireEvent.blur(input);
  };

  it('should enable the submit button when form is valid', async () => {
    const { emailInput, passwordInput } = setup();

    await waitFor(async () => {
      await fillInput(emailInput, 'example@email.com');
      await fillInput(passwordInput, 'password123');
    });

    const submitButton = await screen.findByRole('button', { name: /login/i });

    expect(submitButton).toBeEnabled();
  });

  it('should shows validation errors when inputs are left empty', async () => {
    const { emailInput, passwordInput } = setup();

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.REQUIRED('Email')),
      ).toBeInTheDocument();
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.REQUIRED('Password')),
      ).toBeInTheDocument();
    });
  });

  it('should show validation error when email is invalid', async () => {
    const { emailInput } = setup();

    await fillInput(emailInput, 'invalidEmail');

    await waitFor(() => {
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.INVALID('Email')),
      ).toBeInTheDocument();
    });
  });

  it('should show validation error when password is less than min characters', async () => {
    const { passwordInput } = setup();

    await fillInput(passwordInput, 'min');

    await waitFor(() => {
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.MIN_LENGTH('Password', 8)),
      ).toBeInTheDocument();
    });
  });

  it('should show validation error when password is more than max length', async () => {
    const { passwordInput } = setup();

    await fillInput(passwordInput, 'password1212121112112121212121212111221');

    await waitFor(() => {
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.MAX_LENGTH('Password', 32)),
      ).toBeInTheDocument();
    });
  });

  it('should renders correctly form', () => {
    const { container } = render(<LoginForm />);

    expect(container).toMatchSnapshot();
  });
});
