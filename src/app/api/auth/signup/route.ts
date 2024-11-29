import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { AuthResponse, SignupFormData } from '@/types';

export async function POST(req: Request) {
  const data: SignupFormData = await req.json();

  const response = await apiClient.post<AuthResponse>(
    `${API_ENDPOINT.AUTH}/register`,
    {
      body: data,
    },
  );

  return Response.json(response);
}
