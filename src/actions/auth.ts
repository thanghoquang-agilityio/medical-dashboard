'use server';

import { signIn } from '@/config/auth';
import { PRIVATE_ROUTES } from '@/constants';
import { login as loginService, signup as signupService } from '@/services';
import { LoginFormData, SignupFormData, UserSession } from '@/types';

export const login = async (data: LoginFormData) => await loginService(data);

export const loginNextAuth = async (user: UserSession) => {
  await signIn('credentials', {
    ...user,
    redirectTo: PRIVATE_ROUTES.DASHBOARD,
  });

  return user;
};

export const signup = async (data: Omit<SignupFormData, 'confirmPassWord'>) => {
  const user = await signupService(data);

  return user;
};
