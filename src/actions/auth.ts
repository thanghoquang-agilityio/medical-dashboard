'use server';

import { cookies } from 'next/headers';
import { signIn, signOut } from '@/config/auth';
import {
  AUTH_SESSION_COOKIES_KEY,
  PRIVATE_ROUTES,
  REMEMBER_ME_COOKIES_KEY,
} from '@/constants';
import { login, signup as signUpService } from '@/services';
import { LoginFormData, SignupFormData, UserLogged } from '@/types';

export const loginStrapi = async (data: LoginFormData) => await login(data);

export const loginNextAuth = async (
  user: UserLogged & { token: string; remember: boolean },
) => {
  await signIn('credentials', {
    ...user,
    redirectTo: PRIVATE_ROUTES.DASHBOARD,
  });

  return user;
};

export const logout = async () => {
  cookies().delete(REMEMBER_ME_COOKIES_KEY);
  cookies().delete(
    (process.env.NODE_ENV === 'production' &&
      process.env.NEXT_PUBLIC_AUTH_SESSION_TOKEN_KEY) ||
      AUTH_SESSION_COOKIES_KEY,
  );

  await signOut({ redirect: false });
};

export const signUp = async (data: Omit<SignupFormData, 'confirmPassWord'>) => {
  const user = await signUpService(data);

  return user;
};
