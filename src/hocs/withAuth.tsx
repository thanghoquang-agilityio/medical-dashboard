import { SERVER_ERROR_MESSAGES } from '@/constants';
import { createErrorResponse } from '@/utils';
import { NextResponse } from 'next/server';

export function validateAuthHeader(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return createErrorResponse(SERVER_ERROR_MESSAGES[401], 401);
  }
  return null;
}

export function withAuth(
  handler: (req: Request) => Promise<NextResponse | Response>,
) {
  return async (req: Request) => {
    const authError = validateAuthHeader(req);
    if (authError) return authError;

    return handler(req);
  };
}
