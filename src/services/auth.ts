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
): Promise<{ user: UserSession | null; error: string | null }> => {
  try {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINT.AUTH, {
      body: {
        identifier: body.identifier,
        password: body.password,
      },
    });
    const { error, jwt, user } = response;
    if (error && !user) {
      return {
        user: null,
        error: (JSON.parse(error) as ErrorResponse).error.message,
      };
    }
    const { user: userLogged, error: errorGetUserLogged } =
      await getUserLogged(jwt);

    if (errorGetUserLogged) {
      return {
        user: null,
        error: errorGetUserLogged,
      };
    }

    const {
      id = '',
      avatar,
      role,
      username = '',
      email = '',
    } = userLogged || {};
    const { url = '' } = avatar || {};
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
      error: errorMessage,
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

    if (error && !user) {
      return {
        user: null,
        error: (JSON.parse(error) as ErrorResponse).error.message,
      };
    }

    return { user, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request register';

    return {
      user: null,
      error: errorMessage,
    };
  }
};

export const logout = async () => await signOut();
