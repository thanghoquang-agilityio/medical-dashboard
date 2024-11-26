'use server';

import { signIn } from '@/config/auth';
import {
  login as loginService,
  signup as signupService,
  addUserToChemists as addUserToChemistsService,
} from '@/services';
import {
  ChemistPayload,
  LoginFormData,
  SignupFormData,
  UserSession,
} from '@/types';

export const login = async (data: LoginFormData) => await loginService(data);

export const loginNextAuth = async (user: UserSession) => {
  await signIn('credentials', {
    ...user,
    redirect: false,
  });

  return user;
};

export const signup = async (data: Omit<SignupFormData, 'confirmPassWord'>) => {
  const user = await signupService(data);

  return user;
};

export const addUserToChemists = async (data: ChemistPayload) =>
  await addUserToChemistsService({
    users_permissions_user: data.users_permissions_user,
  });
