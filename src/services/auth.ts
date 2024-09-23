'use server';

import { signOut } from '@/config/auth';
import { apiClient } from './api';
import { getUserLogged } from './user';
import {
  UserLogged,
  AuthResponse,
  LoginFormData,
  SignupFormData,
} from '@/types';
import { API_ENDPOINT } from '@/constants';

export const login = async (
  body: LoginFormData,
): Promise<(UserLogged & { token: string; remember: boolean }) | null> => {
  try {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINT.AUTH, {
      body: {
        identifier: body.identifier,
        password: body.password,
      },
    });
    const { error, jwt, user } = response;

    if (error || !user) {
      return null;
    }
    const profile = await getUserLogged(jwt);

    if (!profile) {
      return null;
    }

    const data = {
      token: jwt,
      remember: body.remember,
      ...profile,
    };

    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request login';
    throw new Error(errorMessage);
  }
};

export const signup = async (
  body: SignupFormData,
): Promise<Pick<AuthResponse, 'error' | 'user'>> => {
  try {
    const { error, user } = await apiClient.post<AuthResponse>(
      `${API_ENDPOINT}/register`,
      {
        body,
      },
    );

    return { error, user };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request register';
    throw new Error(errorMessage);
  }
};

export const logout = async () => await signOut();
