import { API_ENDPOINT } from '@/constants';
import { withAuth } from '@/hocs/withAuth';
import { TransferSchema } from '@/schemas';
import { apiClient } from '@/services';
import { APIRelatedResponse, TransferPayload, TransferResponse } from '@/types';
import { createErrorResponse } from '@/utils';

export const POST = withAuth(async (req: Request) => {
  let payload: APIRelatedResponse<TransferPayload>;

  try {
    payload = await req.json();
  } catch (error) {
    return createErrorResponse('Request body is not found');
  }

  if (!payload?.data || Object.keys(payload.data).length === 0) {
    return createErrorResponse('No data provided');
  }

  const bearerToken = req.headers.get('Authorization') ?? '';

  const { senderId = '', receiverId = '', amount = 0 } = payload.data;

  const validatedFields = TransferSchema.safeParse({
    senderId,
    receiverId,
    amount,
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error?.flatten().fieldErrors;
    for (const [_, error] of Object.entries(fieldErrors)) {
      if (error) return createErrorResponse(error[0]);
    }
  }

  const result = await apiClient.post<TransferResponse>(
    `${API_ENDPOINT.TRANSFERS}`,
    {
      body: payload,
      headers: {
        Authorization: bearerToken,
      },
    },
  );

  return Response.json(result);
});
