import { UseFormGetValues } from 'react-hook-form';
import { TimeInputValue } from '@nextui-org/react';

// Constants
import { FORM_VALIDATION_MESSAGE } from '@/constants';

// Utils
import { isFutureDate, generateISODate } from '@/utils';

// Types
import { AppointMentForm } from '.';

export const APPOINTMENT_FORM_VALIDATION = {
  SENDER_ID: (getValues: UseFormGetValues<AppointMentForm>) => {
    return {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('The sender'),
      validate: {
        notSameAsSender: (value: string) =>
          value !== getValues('receiverId') ||
          FORM_VALIDATION_MESSAGE.NOT_SAME_AS_SENDER,
      },
    };
  },
  RECEIVER_ID: (getValues: UseFormGetValues<AppointMentForm>) => {
    return {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('The receiver'),
      validate: {
        notSameAsSender: (value: string) =>
          value !== getValues('senderId') ||
          FORM_VALIDATION_MESSAGE.NOT_SAME_AS_SENDER,
      },
    };
  },
  START_DATE: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('The start date'),
    validate: (value: string) =>
      value >= new Date(Date.now()).toISOString().split('T')[0] ||
      FORM_VALIDATION_MESSAGE.MIN_TIME('The start date'),
  },
  START_TIME: (getValues: UseFormGetValues<AppointMentForm>) => {
    return {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('The start time'),
      validate: (value: TimeInputValue) => {
        const startDate = getValues('startDate');

        // Validates the start time based on today's date and current time
        return (
          isFutureDate(generateISODate(value, startDate)) ||
          FORM_VALIDATION_MESSAGE.MIN_TIME('The start time')
        );
      },
    };
  },
  DURATION_TIME: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('The duration time'),
  },
  STATUS: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('The status'),
  },
};
