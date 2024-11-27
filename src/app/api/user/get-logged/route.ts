import { getUserLogged } from '@/services';
import { UserLogged } from '@/types';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const bearerToken = req.headers.get('Authorization');

  const token = bearerToken ? bearerToken.split(' ')[1] : '';

  const {
    user,
    error,
  }: {
    user: UserLogged | null;
    error: string | null;
  } = await getUserLogged(token);

  return NextResponse.json({
    user,
    error,
  });
}
