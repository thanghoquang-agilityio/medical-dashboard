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
};

export const ERROR_MESSAGE = {
  LOGIN: 'Login failed. Please try again.',
  SIGNUP: 'Signup failed. Please try again.',
};
