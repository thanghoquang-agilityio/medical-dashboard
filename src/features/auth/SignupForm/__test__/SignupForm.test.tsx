import { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import SignupForm from '..';
import { FORM_VALIDATION_MESSAGE } from '@/constants';
import { MOCK_AUTH } from '@/mocks';

describe('SignupForm Component', () => {
  const setup = () => {
    const { container } = render(<SignupForm />);

    return {
      container,
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
      await fillInput(emailInput, MOCK_AUTH.EMAIL);
      await fillInput(passwordInput, MOCK_AUTH.PASSWORD);
      await fillInput(confirmPasswordInput, MOCK_AUTH.PASSWORD);
    });

    const submitButton = await screen.findByRole('button', { name: /signup/i });

    expect(submitButton).toBeEnabled();
  });

  it('should shows validation errors when inputs are left empty', async () => {
    const { usernameInput, emailInput, passwordInput, confirmPasswordInput } =
      setup();

    // Fill empty inputs
    fireEvent.blur(usernameInput);
    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);
    fireEvent.blur(confirmPasswordInput);

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

    await act(() => fillInput(emailInput, 'invalidEmail'));

    await waitFor(() => {
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.INVALID('Email')),
      ).toBeInTheDocument();
    });
  });

  it('should show validation error when password is less than min characters', async () => {
    const { passwordInput } = setup();

    await act(() => fillInput(passwordInput, 'min'));

    await waitFor(() => {
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.MIN_LENGTH('Password', 8)),
      ).toBeInTheDocument();
    });
  });

  it('should show validation error when password is more than max length', async () => {
    const { passwordInput } = setup();

    await act(() =>
      fillInput(passwordInput, 'password1212121112112121212121212111221'),
    );

    await waitFor(() => {
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.MAX_LENGTH('Password', 32)),
      ).toBeInTheDocument();
    });
  });

  it('should show validation error when password and confirm password does not match', async () => {
    const { passwordInput, confirmPasswordInput } = setup();

    await act(() => fillInput(passwordInput, MOCK_AUTH.PASSWORD));
    await act(() => fillInput(confirmPasswordInput, 'confirmPasswordInput'));

    await waitFor(() => {
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.PASSWORD_NOT_MATCH),
      ).toBeInTheDocument();
    });
  });

  it('should show validation error when name is wrong format', async () => {
    const { usernameInput } = setup();

    await act(() => fillInput(usernameInput, '@'));

    await waitFor(() => {
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.FORMAT('Name')),
      ).toBeInTheDocument();
    });
  });

  it('should renders correctly form', async () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
