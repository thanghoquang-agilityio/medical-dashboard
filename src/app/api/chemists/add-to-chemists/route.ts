import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { ChemistPayload, ChemistResponse } from '@/types';
import { createErrorResponse } from '@/utils';

export async function POST(req: Request) {
  let payload: ChemistPayload;
  try {
    payload = await req.json();
  } catch (error) {
    return createErrorResponse('Request body is not found');
  }

  const { users_permissions_user } = payload;

  if (!users_permissions_user)
    return createErrorResponse('users_permissions_user not provided');

  const result = await apiClient.post<{
    data: ChemistResponse;
    error?: string;
  }>(`${API_ENDPOINT.CHEMISTS}`, {
    body: {
      data: payload,
    },
  });

  return Response.json(result);
}
