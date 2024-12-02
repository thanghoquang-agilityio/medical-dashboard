import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { UserLogged } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const bearToken = req.headers.get('Authorization') ?? '';

  const response = await apiClient.get<UserLogged[] & { error: string | null }>(
    `${API_ENDPOINT.USERS}?${decodeURIComponent(searchParams.toString())}`,
    {
      headers: {
        Authorization: bearToken,
      },
    },
  );

  return NextResponse.json(response);
}
