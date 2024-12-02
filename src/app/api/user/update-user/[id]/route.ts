import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { UserModel } from '@/types';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const data = await req.json();

  const bearerToken = req.headers.get('Authorization') || '';

  const response = await apiClient.put<UserModel & { error: string | null }>(
    `${API_ENDPOINT.USERS}/${id}`,
    {
      body: data,
      headers: {
        Authorization: bearerToken,
      },
    },
  );

  return Response.json(response);
}
