import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { UserLogged } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const bearToken = req.headers.get('Authorization') ?? '';

  const response = await apiClient.get<UserLogged & { error: string | null }>(
    `${API_ENDPOINT.USERS}/me?populate=*`,
    {
      headers: {
        Authorization: bearToken,
      },
      next: { revalidate: 3600, tags: [API_ENDPOINT.USERS, 'logged'] },
    },
  );

  return NextResponse.json(response);
}
