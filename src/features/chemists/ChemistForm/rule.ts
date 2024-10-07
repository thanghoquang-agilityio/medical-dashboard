import { FORM_VALIDATION_MESSAGE, REGEX } from '@/constants';

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
