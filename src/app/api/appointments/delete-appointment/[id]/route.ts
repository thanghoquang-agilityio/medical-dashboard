import { API_ENDPOINT, SERVER_ERROR_MESSAGES } from '@/constants';
import { apiClient } from '@/services';
import { AppointmentResponse } from '@/types';
import { createErrorResponse } from '@/utils';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const bearerToken = req.headers.get('Authorization') || '';

  if (!bearerToken) {
    return createErrorResponse(SERVER_ERROR_MESSAGES[403], 403);
  }
  const id = params.id;

  if (!id) {
    return createErrorResponse('No id provided');
  }

  const response = await apiClient.delete<{
    data: AppointmentResponse;
    error?: string;
  }>(`${API_ENDPOINT.APPOINTMENTS}/${id}`, {
    headers: {
      Authorization: bearerToken,
    },
  });

  return Response.json(response);
}
