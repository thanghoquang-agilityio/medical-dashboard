import { loginNextAuth } from '@/actions/auth';
import { PRIVATE_ROUTES } from '@/constants';
import { UserSession } from '@/types';

export async function POST(req: Request) {
  const data: UserSession = await req.json();

  await loginNextAuth(data);

  return Response.json(PRIVATE_ROUTES.DASHBOARD);
}
