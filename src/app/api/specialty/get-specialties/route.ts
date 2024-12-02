import { API_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { SpecialtiesResponse } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const response = await apiClient.get<
    SpecialtiesResponse & { error?: string }
  >(
    `${API_ENDPOINT.SPECIALTIES}?${decodeURIComponent(searchParams.toString())}`,
  );

  return NextResponse.json(response);
}
