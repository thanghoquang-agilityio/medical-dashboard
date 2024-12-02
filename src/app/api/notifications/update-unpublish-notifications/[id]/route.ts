import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  const bearerToken = req.headers.get('Authorization') ?? '';

  const result = await apiClient.put<{ error: string | null }>(
    `${API_ENDPOINT.NOTIFICATIONS}/unpublish/${id}`,
    {
      headers: {
        Authorization: bearerToken,
      },
    },
  );

  return Response.json(result);
}
