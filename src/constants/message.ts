export const FORM_VALIDATION_MESSAGE = {
  REQUIRED: (item: string) => `${item} must not be empty.`,
  ALL_WHITE_SPACE: (item: string) => `${item} cannot contain only whitespace.`,
  INVALID: (item: string) => `${item} is invalid. Please try again.`,
  MIN_LENGTH: (item: string, min: number) =>
    `${item} must be at least ${min} characters.`,
  MAX_LENGTH: (item: string, max: number) =>
    `${item} must be less than ${max} characters.`,
  PASSWORD_NOT_MATCH: 'Password does not match',
  FORMAT: (ariaLabel: string) =>
    `${ariaLabel} does not follow the correct format.`,
  MIN_TIME: (item: string) => `${item} must be in present or future.`,
  DURATION: (item: string) => `${item} must be between 00:00 and 23:59.`,
};

export const ERROR_MESSAGE = {
  LOGIN: 'Login failed. Please try again.',
  SIGNUP: 'Signup failed. Please try again.',
  DELETE: (item: string) => `Delete ${item} failed. Please try again.`,
};

export const SUCCESS_MESSAGE = {
  LOGIN: 'Login successful.',
  SIGNUP: 'Signup successful.',
  DELETE: (item: string) => `Delete ${item} successful.`,
};
