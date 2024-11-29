import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { AppointmentResponse } from '@/types';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const data = await req.json();

  const id = params.id;
  const bearerToken = req.headers.get('Authorization') || '';

  const response = await apiClient.put<{
    data: AppointmentResponse;
    error?: string;
  }>(`${API_ENDPOINT.APPOINTMENTS}/${id}`, {
    body: data,
    headers: {
      Authorization: bearerToken,
    },
  });

  return Response.json(response);
}
