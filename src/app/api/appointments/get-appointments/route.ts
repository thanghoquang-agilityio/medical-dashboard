import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const bearerToken = req.headers.get('Authorization') || '';

  const result = await apiClient.get(
    `${API_ENDPOINT.APPOINTMENTS}?${decodeURIComponent(searchParams.toString())}`,
    {
      headers: {
        Authorization: bearerToken,
      },
    },
  );

  return NextResponse.json(result);
}
