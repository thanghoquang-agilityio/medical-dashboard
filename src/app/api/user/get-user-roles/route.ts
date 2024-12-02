import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { RolesResponse } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest) {
  const response = await apiClient.get<RolesResponse>(
    `${API_ENDPOINT.PERMISSIONS}/roles`,
  );

  return NextResponse.json(response);
}
