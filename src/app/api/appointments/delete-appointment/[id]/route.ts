import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { AppointmentResponse } from '@/types';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const bearerToken = req.headers.get('Authorization') || '';

  const response = await apiClient.delete<{
    data: AppointmentResponse;
    error?: string;
  }>(`${API_ENDPOINT.APPOINTMENTS}/${id}`, {
    headers: {
      Authorization: bearerToken,
    },
  });

  return Response.json(response);
}
