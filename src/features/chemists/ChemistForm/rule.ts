import {
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetError,
} from 'react-hook-form';

import { FORM_VALIDATION_MESSAGE, REGEX } from '@/constants';
import { LOGIN_FORM_VALIDATION } from '@/features/auth/LoginForm/rule';
import { ChemistFormData } from '@/types';

export const CHEMIST_FORM_VALIDATION = {
  EMAIL: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Email'),
    pattern: {
      value: REGEX.EMAIL,
      message: FORM_VALIDATION_MESSAGE.INVALID('Email'),
    },
  },
  USERNAME: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Name'),
    pattern: {
      value: REGEX.NAME,
      message: FORM_VALIDATION_MESSAGE.FORMAT('Name'),
    },
  },
  PASSWORD: (
    getValues: UseFormGetValues<ChemistFormData>,
    setError: UseFormSetError<ChemistFormData>,
    clearErrors: UseFormClearErrors<ChemistFormData>,
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
  CONFIRM_PASSWORD: (getValues: UseFormGetValues<ChemistFormData>) => {
    return {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Confirm Password'),
      validate: {
        matchesPassword: (value: string) =>
          value === getValues('password') ||
          FORM_VALIDATION_MESSAGE.PASSWORD_NOT_MATCH,
      },
    };
  },
  SPECIALTY: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Specialty'),
  },
  DESCRIPTION: {
    pattern: {
      value: REGEX.ALL_WHITE_SPACE,
      message: FORM_VALIDATION_MESSAGE.ALL_WHITE_SPACE('Description'),
    },
  },
};
