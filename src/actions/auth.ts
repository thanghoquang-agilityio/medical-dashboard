'use server';

import { signIn, signOut } from '@/config/auth';
import {
  AUTH_SESSION_COOKIES_KEY,
  PRIVATE_ROUTES,
  REMEMBER_ME_COOKIES_KEY,
  TOKEN,
  UID_KEY,
} from '@/constants';
import { login as loginService } from '@/services';
import { LoginFormData } from '@/types';
import { cookies } from 'next/headers';

export const login = async (data: LoginFormData) => {
  const user = await loginService(data);

  await signIn('credentials', {
    ...user,
    redirectTo: PRIVATE_ROUTES.DASHBOARD,
  });

  return user;
};

export const logout = async () => {
  cookies().delete(REMEMBER_ME_COOKIES_KEY);
  cookies().delete(UID_KEY);
  cookies().delete(TOKEN);
  cookies().delete(
    (process.env.NODE_ENV === 'production' &&
      process.env.NEXT_PUBLIC_AUTH_SESSION_TOKEN_KEY) ||
      AUTH_SESSION_COOKIES_KEY,
  );

  await signOut({ redirect: false });
};
