import {
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetError,
} from 'react-hook-form';

import { FORM_VALIDATION_MESSAGE, REGEX } from '@/constants';
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
      message: FORM_VALIDATION_MESSAGE.ONLY_TEXT,
    },
  },
  PASSWORD: (
    getValues: UseFormGetValues<ChemistFormData>,
    setError: UseFormSetError<ChemistFormData>,
    clearErrors: UseFormClearErrors<ChemistFormData>,
    isEdit: boolean,
  ) => {
    return {
      required: isEdit
        ? undefined
        : FORM_VALIDATION_MESSAGE.REQUIRED('Password'),
      minLength: {
        value: 8,
        message: FORM_VALIDATION_MESSAGE.MIN_LENGTH('Password', 8),
      },
      maxLength: {
        value: 32,
        message: FORM_VALIDATION_MESSAGE.MAX_LENGTH('Password', 32),
      },
      pattern: {
        value: REGEX.ALL_WHITE_SPACE,
        message: FORM_VALIDATION_MESSAGE.ALL_WHITE_SPACE('Password'),
      },
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
  CONFIRM_PASSWORD: (
    getValues: UseFormGetValues<ChemistFormData>,
    isEdit: boolean,
  ) => {
    return {
      required: isEdit
        ? undefined
        : FORM_VALIDATION_MESSAGE.REQUIRED('Confirm Password'),
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
