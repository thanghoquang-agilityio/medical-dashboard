'use server';

import { apiClient } from './api';
import { getUserLogged } from './user';
import {
  UserSession,
  AuthResponse,
  LoginFormData,
  SignupFormData,
  ErrorResponse,
} from '@/types';
import { API_ENDPOINT } from '@/constants';
import { signOut } from '@/config/auth';

export const login = async (
  body: LoginFormData,
): Promise<
  | { user: UserSession; error: ErrorResponse | null }
  | { user: null; error: ErrorResponse | null }
> => {
  try {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINT.AUTH, {
      body: {
        identifier: body.identifier,
        password: body.password,
      },
    });
    const { error, jwt, user } = response;
    if (error || !user) {
      return { user: null, error: JSON.parse(error) as ErrorResponse };
    }
    const profile = await getUserLogged(jwt);

    if (typeof profile === 'string') {
      return { user: null, error: JSON.parse(profile) as ErrorResponse };
    }

    const { id = '', avatar, role, username = '', email = '' } = profile || {};
    const { attributes } = avatar || {};
    const { url = '' } = attributes || {};
    const { name = '' } = role || {};

    const data = {
      id: id,
      token: jwt,
      remember: body.remember,
      role: name,
      avatar: url,
      username: username,
      email: email,
    };

    return { user: data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request login';

    return {
      user: null,
      error: { error: { message: errorMessage } },
    };
  }
};

export const signup = async (
  body: Omit<SignupFormData, 'confirmPassWord'>,
): Promise<Pick<AuthResponse, 'error' | 'user'>> => {
  try {
    const { error, user } = await apiClient.post<AuthResponse>(
      `${API_ENDPOINT.AUTH}/register`,
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
