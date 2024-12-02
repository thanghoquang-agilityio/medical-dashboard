import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { UserModel } from '@/types';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  const data = await req.json();

  const bearerToken = req.headers.get('Authorization') ?? '';

  const result = await apiClient.put<UserModel & { error: string | null }>(
    `${API_ENDPOINT.USERS}/${id}`,
    {
      headers: {
        Authorization: bearerToken,
      },
      body: data,
    },
  );

  return Response.json(result);
}
