import { AUTH_ROUTES } from '@/constants';
import { logout } from '@/services';

export async function POST() {
  await logout();

  return Response.json(AUTH_ROUTES.LOGIN);
}
