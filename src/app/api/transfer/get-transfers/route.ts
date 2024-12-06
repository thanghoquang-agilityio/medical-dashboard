import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { TransferDataResponse } from '@/types';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const bearerToken = req.headers.get('Authorization') ?? '';

  const result = await apiClient.get<TransferDataResponse>(
    `${API_ENDPOINT.TRANSFERS}?${decodeURIComponent(searchParams.toString())}`,
    {
      headers: {
        Authorization: bearerToken,
      },
    },
  );

  return Response.json(result);
}
