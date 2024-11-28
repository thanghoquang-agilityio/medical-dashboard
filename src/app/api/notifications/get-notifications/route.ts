'use server';
import { getNotifications } from '@/services';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tagsHeader = req.headers.get('tags');

  const tags = tagsHeader ? tagsHeader.split(',') : [];

  const result = await getNotifications({
    searchParams,
    options: { next: { tags } },
  });

  return NextResponse.json(result);
}
