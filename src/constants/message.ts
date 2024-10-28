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
  NOT_SAME_AS_SENDER: 'Sender and receiver cannot be the same.',
  ONLY_TEXT: 'Please enter text only.',
  MAX_SIZE: ({
    item,
    size,
    unit,
  }: {
    item: string;
    size: number;
    unit: string;
  }) => `Max ${item} size is ${size}${unit}`,
  ACCEPTED_FORMATS: 'Only .jpg, .jpeg, .png and .webp formats are supported.',
};

export const ERROR_MESSAGE = {
  LOGIN: 'Login failed. Please try again.',
  SIGNUP: 'Signup failed. Please try again.',
  DELETE: (item: string) => `Delete ${item} failed. Please try again.`,
  CREATE: (item: string) => `Create ${item} failed. Please try again.`,
  UPDATE: (item: string) => `Update ${item} failed. Please try again.`,
  CANCEL: (item: string) => `Cancel ${item} failed. Please try again.`,
  DUPLICATE_FIELD: 'This attribute must be unique',
  USERNAME: 'Username already taken',
};

export const SUCCESS_MESSAGE = {
  LOGIN: 'Login successful.',
  SIGNUP: 'Signup successful.',
  DELETE: (item: string) => `Delete ${item} successfully.`,
  CREATE: (item: string) => `Create ${item} successfully.`,
  UPDATE: (item: string) => `Update ${item} successfully.`,
  CANCEL: (item: string) => `Cancel ${item} successfully.`,
};

export const NOTIFICATION_CONTENT = (action: string) =>
  `have been ${action} appointment`;
