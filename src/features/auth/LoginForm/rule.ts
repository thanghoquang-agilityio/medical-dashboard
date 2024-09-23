import { FORM_VALIDATION_MESSAGE, REGEX } from '@/constants';

export const LOGIN_FORM_VALIDATION = {
  EMAIL: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Email'),
    pattern: {
      value: REGEX.EMAIL,
      message: FORM_VALIDATION_MESSAGE.INVALID('Email'),
    },
  },
  PASSWORD: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Password'),
    minLength: {
      value: 8,
      message: FORM_VALIDATION_MESSAGE.MIN_LENGTH('Password', 8),
    },
    maxLength: {
      value: 32,
      message: FORM_VALIDATION_MESSAGE.MIN_LENGTH('Password', 32),
    },
    pattern: {
      value: REGEX.ALL_WHITE_SPACE,
      message: FORM_VALIDATION_MESSAGE.ALL_WHITE_SPACE('Password'),
    },
  },
};
