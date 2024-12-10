import {
  API_ENDPOINT,
  FORM_VALIDATION_MESSAGE,
  SERVER_ERROR_MESSAGES,
} from '@/constants';
import { apiClient } from '@/services';
import { AppointmentPayload, AppointmentResponse } from '@/types';
import { createErrorResponse, isFutureDate } from '@/utils';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  let payload: { data: AppointmentPayload };
  try {
    payload = await req.json();
  } catch (error) {
    return createErrorResponse('Request body is not found');
  }

  const bearerToken = req.headers.get('Authorization') || '';

  if (!bearerToken) {
    return createErrorResponse(SERVER_ERROR_MESSAGES[403], 403);
  }

  if (!payload?.data || Object.keys(payload.data).length === 0) {
    return createErrorResponse('No data provided');
  }

  const { senderId, receiverId, durationTime, startTime, status } =
    payload.data;

  const validations = [
    {
      condition: !senderId,
      message: FORM_VALIDATION_MESSAGE.REQUIRED('senderId'),
    },
    {
      condition: !receiverId,
      message: FORM_VALIDATION_MESSAGE.REQUIRED('receiverId'),
    },
    {
      condition: senderId === receiverId,
      message: FORM_VALIDATION_MESSAGE.NOT_SAME_AS_SENDER,
    },
    {
      condition: !durationTime,
      message: FORM_VALIDATION_MESSAGE.REQUIRED('durationTime'),
    },
    {
      condition: !startTime,
      message: FORM_VALIDATION_MESSAGE.REQUIRED('startTime'),
    },
    {
      condition: !status?.toString(),
      message: FORM_VALIDATION_MESSAGE.REQUIRED('status'),
    },
    {
      condition: startTime && !isFutureDate(startTime),
      message: FORM_VALIDATION_MESSAGE.MIN_TIME('The start time'),
    },
  ];

  for (const { condition, message } of validations) {
    if (condition) {
      return createErrorResponse(message);
    }
  }

  const response = await apiClient.put<{
    data: AppointmentResponse;
    error?: string;
  }>(`${API_ENDPOINT.APPOINTMENTS}/${id}`, {
    body: payload,
    headers: { Authorization: bearerToken },
  });

  return Response.json(response);
}
