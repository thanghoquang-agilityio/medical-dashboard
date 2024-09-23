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
  CONFIRM_PASSWORD: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Confirm Password'),
    validate: {
      matchesPassword: (
        value: string,
        { getValues }: { getValues: () => SignupFormData },
      ) =>
        value === getValues().password ||
        FORM_VALIDATION_MESSAGE.PASSWORD_NOT_MATCH,
    },
  },
};
