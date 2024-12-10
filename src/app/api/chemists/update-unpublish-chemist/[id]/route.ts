import { API_ENDPOINT, SERVER_ERROR_MESSAGES } from '@/constants';
import { apiClient } from '@/services';
import { createErrorResponse } from '@/utils';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const bearerToken = req.headers.get('Authorization') ?? '';
  if (!bearerToken) {
    return createErrorResponse(SERVER_ERROR_MESSAGES[403], 403);
  }

  const id = params.id;
  if (!id) {
    return createErrorResponse('No id provided');
  }

  const result = await apiClient.put<{ error: string | null }>(
    `${API_ENDPOINT.CHEMISTS}/unpublish/${id}`,
    {
      headers: {
        Authorization: bearerToken,
      },
    },
  );

  return Response.json(result);
}
