import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import SignupForm from '..';
import { FORM_VALIDATION_MESSAGE } from '@/constants';

describe('SignupForm Component', () => {
  const setup = () => {
    render(<SignupForm />);

    return {
      usernameInput: screen.getByPlaceholderText('user name'),
      emailInput: screen.getByPlaceholderText('email address'),
      passwordInput: screen.getByPlaceholderText('password'),
      confirmPasswordInput: screen.getByPlaceholderText('confirm password'),
    };
  };

  // Helper functions for filling inputs
  const fillInput = async (input: HTMLElement, value: string) => {
    fireEvent.change(input, { target: { value } });
    fireEvent.blur(input);
  };

  it('should enable the submit button when form is valid', async () => {
    const { usernameInput, emailInput, passwordInput, confirmPasswordInput } =
      setup();

    await waitFor(async () => {
      await fillInput(usernameInput, 'example user');
      await fillInput(emailInput, 'example@email.com');
      await fillInput(passwordInput, 'password123');
      await fillInput(confirmPasswordInput, 'password123');
    });

    const submitButton = await screen.findByRole('button', { name: /signup/i });

    expect(submitButton).toBeEnabled();
  });

  it('should shows validation errors when inputs are left empty', async () => {
    const { usernameInput, emailInput, passwordInput, confirmPasswordInput } =
      setup();

    // Fill empty inputs
    fillInput(usernameInput, 'example user');
    fillInput(usernameInput, '');
    fillInput(emailInput, 'password123');
    fillInput(emailInput, '');
    fillInput(passwordInput, 'password123');
    fillInput(passwordInput, '');
    fillInput(confirmPasswordInput, 'password123');
    fillInput(confirmPasswordInput, '');

    await waitFor(() => {
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.REQUIRED('Name')),
      ).toBeInTheDocument();
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.REQUIRED('Email')),
      ).toBeInTheDocument();
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.REQUIRED('Password')),
      ).toBeInTheDocument();
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.REQUIRED('Confirm Password')),
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

  it('should show validation error when password and confirm password does not match', async () => {
    const { passwordInput, confirmPasswordInput } = setup();

    await fillInput(passwordInput, 'password');
    await fillInput(confirmPasswordInput, 'confirmPasswordInput');

    await waitFor(() => {
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.PASSWORD_NOT_MATCH),
      ).toBeInTheDocument();
    });
  });

  it('should show validation error when name is wrong format', async () => {
    const { usernameInput } = setup();

    await fillInput(usernameInput, '@');

    await waitFor(() => {
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.FORMAT('Name')),
      ).toBeInTheDocument();
    });
  });

  it('should renders correctly form', () => {
    const { container } = render(<SignupForm />);

    expect(container).toMatchSnapshot();
  });
});
