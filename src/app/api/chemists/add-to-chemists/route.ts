import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { ChemistPayload, ChemistResponse } from '@/types';

export async function POST(req: Request) {
  const payload: ChemistPayload = await req.json();

  const result = await apiClient.post<{
    data: ChemistResponse;
    error?: string;
  }>(`${API_ENDPOINT.CHEMISTS}`, {
    body: {
      data: payload,
    },
  });

  return Response.json(result);
}
