import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { ChemistsResponse } from '@/types';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const bearerToken = req.headers.get('Authorization') ?? '';

  const result = await apiClient.get<ChemistsResponse & { error?: string }>(
    `${API_ENDPOINT.CHEMISTS}?${decodeURIComponent(searchParams.toString())}`,
    {
      headers: {
        Authorization: bearerToken,
      },
    },
  );

  return Response.json(result);
}
