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
  MIN_AMOUNT: (item: string) => `${item} must be more than $0.00`,
  INVALID_TYPE: (item: string, type: string) => `${item} must be ${type}.`,
};

export const ERROR_MESSAGE = {
  LOGIN: 'Login failed. Please try again.',
  SIGNUP: 'Signup failed. Please try again.',
  DELETE: (item: string) => `Delete ${item} failed. Please try again.`,
  CREATE: (item: string, error: string) =>
    `Create ${item} failed. Detail error: ${error}.`,
  UPDATE: (item: string, error: string) =>
    `Update ${item} failed. Detail error: ${error}.`,
  CANCEL: (item: string) => `Cancel ${item} failed. Please try again.`,
  DUPLICATE_FIELD: 'This attribute must be unique',
  USERNAME: 'Username already taken',
  TRANSFER: (error: string) =>
    `The transfer has failed. Detail error: ${error}`,
  INSUFFICIENT_FUND: 'Not enough money.',
};

export const SUCCESS_MESSAGE = {
  LOGIN: 'Login successful.',
  SIGNUP: 'Signup successful.',
  DELETE: (item: string) => `Delete ${item} successfully.`,
  CREATE: (item: string) => `Create ${item} successfully.`,
  UPDATE: (item: string) => `Update ${item} successfully.`,
  CANCEL: (item: string) => `Cancel ${item} successfully.`,
  TRANSFER: 'The transfer completed successfully.',
};

export const NOTIFICATION_CONTENT = (action: string) =>
  `have been ${action} appointment`;

export const EXCEPTION_ERROR_MESSAGE = {
  GET: (item: string) => `An unexpected error occurred when getting ${item}.`,
  ADD: (item: string) => `An unexpected error occurred when adding ${item}.`,
  UPDATE: (item: string) =>
    `An unexpected error occurred when updating ${item}.`,
  DELETE: (item: string) =>
    `An unexpected error occurred when deleting ${item}.`,
  CANCEL: (item: string) =>
    `An unexpected error occurred when canceling ${item}.`,
  LOGIN: 'An unexpected error occurred in the login request',
  REGISTER: 'An unexpected error occurred in the register request.',
  ADD_MONEY: 'An unexpected error occurred when adding money to the account',
  SEND_MONEY: 'An unexpected error occurred when sending money',
};

export const SERVER_ERROR_MESSAGES = {
  400: 'Bad Request - The server could not understand the request due to invalid syntax.',
  401: 'Unauthorized - The client must authenticate itself to get the requested response.',
  403: 'Forbidden - The client does not have access rights to the content.',
  404: 'Not Found - The server can not find the requested resource.',
  500: "Internal Server Error - The server has encountered a situation it doesn't know how to handle.",
} as const;
