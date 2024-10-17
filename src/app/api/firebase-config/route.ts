// /app/api/firebase-config/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const firebaseConfig = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '',
  );

  return NextResponse.json(firebaseConfig);
}
