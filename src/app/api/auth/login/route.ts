import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { AuthResponse } from '@/types';

export async function POST(req: Request) {
  const data = await req.json();

  const response = await apiClient.post<AuthResponse>(API_ENDPOINT.AUTH, {
    body: data,
  });

  return Response.json(response);
}
