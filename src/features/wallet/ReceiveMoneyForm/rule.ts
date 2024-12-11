import { FORM_VALIDATION_MESSAGE } from '@/constants';

export const RECEIVE_MONEY_FORM_VALIDATION = {
  AMOUNT: {
    validate: (value: string) =>
      parseFloat(value.slice(1)) > 0 ||
      FORM_VALIDATION_MESSAGE.MIN_AMOUNT('Amount'),
  },
};
