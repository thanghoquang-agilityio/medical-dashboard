import { FORM_VALIDATION_MESSAGE } from '@/constants';
import { SendMoneyFormData } from '@/types';
import { UseFormGetValues } from 'react-hook-form';

export const SEND_MONEY_FORM_VALIDATION = {
  SENDER_ID: (getValues: UseFormGetValues<SendMoneyFormData>) => {
    return {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('The sender'),
      validate: {
        notSameAsSender: (value: string) =>
          value !== getValues('receiverId') ||
          FORM_VALIDATION_MESSAGE.NOT_SAME_AS_SENDER,
      },
    };
  },
  RECEIVER_ID: (getValues: UseFormGetValues<SendMoneyFormData>) => {
    return {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('The receiver'),
      validate: {
        notSameAsSender: (value: string) =>
          value !== getValues('senderId') ||
          FORM_VALIDATION_MESSAGE.NOT_SAME_AS_SENDER,
      },
    };
  },
  AMOUNT: {
    validate: (value: string) =>
      parseFloat(value.slice(1)) > 0 || FORM_VALIDATION_MESSAGE.MIN_AMOUNT,
  },
};
