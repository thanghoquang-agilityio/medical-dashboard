import { FORM_VALIDATION_MESSAGE } from '@/constants';
import { z } from 'zod';

export const TransferSchema = z
  .object({
    senderId: z
      .string({
        required_error: FORM_VALIDATION_MESSAGE.REQUIRED('senderId'),
        invalid_type_error: FORM_VALIDATION_MESSAGE.INVALID_TYPE(
          'senderId',
          'string',
        ),
      })
      .min(1, FORM_VALIDATION_MESSAGE.REQUIRED('senderId')),
    receiverId: z
      .string({
        required_error: FORM_VALIDATION_MESSAGE.REQUIRED('receiverId'),
        invalid_type_error: FORM_VALIDATION_MESSAGE.INVALID_TYPE(
          'receiverId',
          'string',
        ),
      })
      .min(1, FORM_VALIDATION_MESSAGE.REQUIRED('receiverId')),
    amount: z.coerce
      .number()
      .gt(0, { message: FORM_VALIDATION_MESSAGE.MIN_AMOUNT('Amount') }),
  })
  .refine(({ receiverId, senderId }) => receiverId !== senderId, {
    message: FORM_VALIDATION_MESSAGE.NOT_SAME_AS_SENDER,
    path: ['receiverId'],
  });
