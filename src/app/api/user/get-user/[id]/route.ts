import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { UserModel } from '@/types';

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const bearerToken = req.headers.get('Authorization') || '';

  const response = await apiClient.get<UserModel & { error: string | null }>(
    `${API_ENDPOINT.USERS}/${id}`,
    {
      headers: {
        Authorization: bearerToken,
      },
    },
  );

  return Response.json(response);
}
