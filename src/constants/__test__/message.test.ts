import {
  FORM_VALIDATION_MESSAGE,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  NOTIFICATION_CONTENT,
  EXCEPTION_ERROR_MESSAGE,
} from '../message';

describe('FORM_VALIDATION_MESSAGE', () => {
  test('REQUIRED', () => {
    expect(FORM_VALIDATION_MESSAGE.REQUIRED('Username')).toBe(
      'Username must not be empty.',
    );
  });

  test('ALL_WHITE_SPACE', () => {
    expect(FORM_VALIDATION_MESSAGE.ALL_WHITE_SPACE('Username')).toBe(
      'Username cannot contain only whitespace.',
    );
  });

  test('INVALID', () => {
    expect(FORM_VALIDATION_MESSAGE.INVALID('Email')).toBe(
      'Email is invalid. Please try again.',
    );
  });

  test('MIN_LENGTH', () => {
    expect(FORM_VALIDATION_MESSAGE.MIN_LENGTH('Password', 6)).toBe(
      'Password must be at least 6 characters.',
    );
  });

  test('MAX_LENGTH', () => {
    expect(FORM_VALIDATION_MESSAGE.MAX_LENGTH('Username', 20)).toBe(
      'Username must be less than 20 characters.',
    );
  });

  test('PASSWORD_NOT_MATCH', () => {
    expect(FORM_VALIDATION_MESSAGE.PASSWORD_NOT_MATCH).toBe(
      'Password does not match',
    );
  });

  test('FORMAT', () => {
    expect(FORM_VALIDATION_MESSAGE.FORMAT('Username')).toBe(
      'Username does not follow the correct format.',
    );
  });

  test('MIN_TIME', () => {
    expect(FORM_VALIDATION_MESSAGE.MIN_TIME('Date')).toBe(
      'Date must be in present or future.',
    );
  });

  test('DURATION', () => {
    expect(FORM_VALIDATION_MESSAGE.DURATION('Duration')).toBe(
      'Duration must be between 00:00 and 23:59.',
    );
  });

  test('NOT_SAME_AS_SENDER', () => {
    expect(FORM_VALIDATION_MESSAGE.NOT_SAME_AS_SENDER).toBe(
      'Sender and receiver cannot be the same.',
    );
  });

  test('ONLY_TEXT', () => {
    expect(FORM_VALIDATION_MESSAGE.ONLY_TEXT).toBe('Please enter text only.');
  });

  test('MAX_SIZE', () => {
    expect(
      FORM_VALIDATION_MESSAGE.MAX_SIZE({ item: 'File', size: 5, unit: 'MB' }),
    ).toBe('Max File size is 5MB');
  });

  test('ACCEPTED_FORMATS', () => {
    expect(FORM_VALIDATION_MESSAGE.ACCEPTED_FORMATS).toBe(
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    );
  });
});

describe('ERROR_MESSAGE', () => {
  test('LOGIN', () => {
    expect(ERROR_MESSAGE.LOGIN).toBe('Login failed. Please try again.');
  });

  test('SIGNUP', () => {
    expect(ERROR_MESSAGE.SIGNUP).toBe('Signup failed. Please try again.');
  });

  test('DELETE', () => {
    expect(ERROR_MESSAGE.DELETE('Appointment')).toBe(
      'Delete Appointment failed. Please try again.',
    );
  });

  test('CREATE', () => {
    expect(ERROR_MESSAGE.CREATE('Appointment', 'Network Error')).toBe(
      'Create Appointment failed. Detail error: Network Error.',
    );
  });

  test('UPDATE', () => {
    expect(ERROR_MESSAGE.UPDATE('Profile', 'Timeout')).toBe(
      'Update Profile failed. Detail error: Timeout.',
    );
  });

  test('CANCEL', () => {
    expect(ERROR_MESSAGE.CANCEL('Appointment')).toBe(
      'Cancel Appointment failed. Please try again.',
    );
  });

  test('DUPLICATE_FIELD', () => {
    expect(ERROR_MESSAGE.DUPLICATE_FIELD).toBe('This attribute must be unique');
  });

  test('USERNAME', () => {
    expect(ERROR_MESSAGE.USERNAME).toBe('Username already taken');
  });
});

describe('SUCCESS_MESSAGE', () => {
  test('LOGIN', () => {
    expect(SUCCESS_MESSAGE.LOGIN).toBe('Login successful.');
  });

  test('SIGNUP', () => {
    expect(SUCCESS_MESSAGE.SIGNUP).toBe('Signup successful.');
  });

  test('DELETE', () => {
    expect(SUCCESS_MESSAGE.DELETE('Appointment')).toBe(
      'Delete Appointment successfully.',
    );
  });

  test('CREATE', () => {
    expect(SUCCESS_MESSAGE.CREATE('Appointment')).toBe(
      'Create Appointment successfully.',
    );
  });

  test('UPDATE', () => {
    expect(SUCCESS_MESSAGE.UPDATE('Profile')).toBe(
      'Update Profile successfully.',
    );
  });

  test('CANCEL', () => {
    expect(SUCCESS_MESSAGE.CANCEL('Appointment')).toBe(
      'Cancel Appointment successfully.',
    );
  });
});

describe('NOTIFICATION_CONTENT', () => {
  test('Content for action', () => {
    expect(NOTIFICATION_CONTENT('updated')).toBe(
      'have been updated appointment',
    );
  });
});

describe('EXCEPTION_ERROR_MESSAGE', () => {
  test('GET', () => {
    expect(EXCEPTION_ERROR_MESSAGE.GET('Profile')).toBe(
      'An unexpected error occurred when getting Profile.',
    );
  });

  test('ADD', () => {
    expect(EXCEPTION_ERROR_MESSAGE.ADD('Appointment')).toBe(
      'An unexpected error occurred when adding Appointment.',
    );
  });

  test('UPDATE', () => {
    expect(EXCEPTION_ERROR_MESSAGE.UPDATE('Appointment')).toBe(
      'An unexpected error occurred when updating Appointment.',
    );
  });

  test('DELETE', () => {
    expect(EXCEPTION_ERROR_MESSAGE.DELETE('Appointment')).toBe(
      'An unexpected error occurred when deleting Appointment.',
    );
  });

  test('CANCEL', () => {
    expect(EXCEPTION_ERROR_MESSAGE.CANCEL('Appointment')).toBe(
      'An unexpected error occurred when canceling Appointment.',
    );
  });

  test('LOGIN', () => {
    expect(EXCEPTION_ERROR_MESSAGE.LOGIN).toBe(
      'An unexpected error occurred in the login request',
    );
  });

  test('REGISTER', () => {
    expect(EXCEPTION_ERROR_MESSAGE.REGISTER).toBe(
      'An unexpected error occurred in the register request.',
    );
  });
});
