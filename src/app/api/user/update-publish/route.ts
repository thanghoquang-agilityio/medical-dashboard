import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { UserModel } from '@/types';

export async function PUT(req: Request) {
  const id: string = await req.json();
  const formattedDate = new Date().toISOString();

  const result = await apiClient.put<UserModel & { error: string | null }>(
    `${API_ENDPOINT.USERS}/${id}`,
    {
      body: {
        publishedAt: formattedDate,
      },
    },
  );

  return Response.json(result);
}
