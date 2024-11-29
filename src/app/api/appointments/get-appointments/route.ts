import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { AppointmentsResponse } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const bearerToken = req.headers.get('Authorization') || '';

  const result = await apiClient.get<AppointmentsResponse & { error?: string }>(
    `${API_ENDPOINT.APPOINTMENTS}?${decodeURIComponent(searchParams.toString())}`,
    {
      headers: {
        Authorization: bearerToken,
      },
    },
  );

  return NextResponse.json(result);
}
