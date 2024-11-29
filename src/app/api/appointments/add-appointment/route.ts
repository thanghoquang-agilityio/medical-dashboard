import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { AppointmentResponse } from '@/types';

export async function POST(req: Request) {
  const data = await req.json();

  const bearerToken = req.headers.get('Authorization') || '';

  const response = await apiClient.post<{
    data: AppointmentResponse;
    error?: string;
  }>(`${API_ENDPOINT.APPOINTMENTS}`, {
    body: data,
    headers: {
      Authorization: bearerToken,
    },
  });

  return Response.json(response);
}
