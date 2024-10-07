import {
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetError,
} from 'react-hook-form';
import { FORM_VALIDATION_MESSAGE, REGEX } from '@/constants';
import { SignupFormData } from '@/types';
import { LOGIN_FORM_VALIDATION } from '../LoginForm/rule';

export const SIGN_UP_FORM_VALIDATION = {
  ...LOGIN_FORM_VALIDATION,
  USERNAME: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Name'),
    pattern: {
      value: REGEX.NAME,
      message: FORM_VALIDATION_MESSAGE.FORMAT('Name'),
    },
  },
  PASSWORD: (
    getValues: UseFormGetValues<SignupFormData>,
    setError: UseFormSetError<SignupFormData>,
    clearErrors: UseFormClearErrors<SignupFormData>,
  ) => {
    return {
      ...LOGIN_FORM_VALIDATION.PASSWORD,
      validate: {
        matchesPassword: (value: string) =>
          !getValues('confirmPassWord') ||
          (value === getValues('confirmPassWord')
            ? (clearErrors('confirmPassWord'), true)
            : false) ||
          setError('confirmPassWord', {
            message: FORM_VALIDATION_MESSAGE.PASSWORD_NOT_MATCH,
            type: 'validate',
          }) ||
          true,
      },
    };
  },
  CONFIRM_PASSWORD: (getValues: UseFormGetValues<SignupFormData>) => {
    return {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Confirm Password'),
      validate: {
        matchesPassword: (value: string) =>
          value === getValues('password') ||
          FORM_VALIDATION_MESSAGE.PASSWORD_NOT_MATCH,
      },
    };
  },
};
