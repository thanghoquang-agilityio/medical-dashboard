import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { TransferDataResponse } from '@/types';

export async function POST(req: Request) {
  const data = await req.json();

  const bearerToken = req.headers.get('Authorization') || '';

  const result = await apiClient.post<TransferDataResponse>(
    `${API_ENDPOINT.TRANSFERS}`,
    {
      body: data,
      headers: {
        Authorization: bearerToken,
      },
    },
  );

  return Response.json(result);
}
