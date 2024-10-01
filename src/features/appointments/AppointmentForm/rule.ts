import { FORM_VALIDATION_MESSAGE } from '@/constants';
import { AppointMentFormData } from '@/types';
import { getCurrentTime } from '@/utils';
import { UseFormGetValues } from 'react-hook-form';

export const APPOINTMENT_FORM_VALIDATION = {
  SENDER_ID: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('The sender'),
    validate: (value: string) =>
      value !== '' || FORM_VALIDATION_MESSAGE.REQUIRED('The sender'),
  },
  RECEIVER_ID: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('The receiver'),
    validate: (value: string) =>
      value !== '' || FORM_VALIDATION_MESSAGE.REQUIRED('The receiver'),
  },
  START_DATE: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('The start date'),
    validate: (value: string) =>
      value >= new Date(Date.now()).toISOString().split('T')[0] ||
      FORM_VALIDATION_MESSAGE.MIN_TIME('The start date'),
  },
  START_TIME: (getValues: UseFormGetValues<AppointMentFormData>) => ({
    required: FORM_VALIDATION_MESSAGE.REQUIRED('The start time'),
    validate: (value: string) =>
      getValues('startDate') >
        new Date(Date.now()).toISOString().split('T')[0] ||
      (getValues('startDate') ==
        new Date(Date.now()).toISOString().split('T')[0] &&
        value >= getCurrentTime()) ||
      FORM_VALIDATION_MESSAGE.MIN_TIME('The start time'),
  }),
  DURATION_TIME: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('The duration time'),
  },
  STATUS: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('The status'),
  },
};
