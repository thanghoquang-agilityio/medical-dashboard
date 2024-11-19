// /app/api/firebase-config/route.ts
import { auth } from '@/config/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const { token = '' } = (await auth())?.user || {};

  if (!token) return new NextResponse('Not authenticated', { status: 401 });

  const firebaseConfig = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '',
  );

  return NextResponse.json(firebaseConfig);
}
