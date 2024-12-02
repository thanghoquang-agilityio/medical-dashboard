import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { UserModel } from '@/types';

export async function POST(req: Request) {
  const data = await req.json();

  const bearerToken = req.headers.get('Authorization') || '';

  const response = await apiClient.post<UserModel & { error: string | null }>(
    `${API_ENDPOINT.USERS}`,
    {
      body: data,
      headers: {
        Authorization: bearerToken,
      },
    },
  );

  return Response.json(response);
}
