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
import {
  API_ENDPOINT,
  AVATAR_THUMBNAIL,
  EXCEPTION_ERROR_MESSAGE,
} from '@/constants';
import { signOut } from '@/config/auth';
import { cookies } from 'next/headers';
import { unregisterFCM } from './notificationFirebase';
import { decrypt } from '@/utils/encode';

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
      role,
      username = '',
      email = '',
      avatar = AVATAR_THUMBNAIL,
    } = userLogged || {};
    const { name = '' } = role || {};

    const data = {
      id: id,
      token: jwt,
      remember: body.remember,
      role: name,
      avatar,
      username,
      email,
    };

    return { user: data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : EXCEPTION_ERROR_MESSAGE.LOGIN;

    return {
      user: null,
      error: errorMessage,
    };
  }
};

export const signup = async (
  body: Omit<SignupFormData, 'confirmPassWord'>,
): Promise<AuthResponse> => {
  try {
    const {
      error,
      user,
      jwt = '',
    } = await apiClient.post<AuthResponse>(`${API_ENDPOINT.AUTH}/register`, {
      body,
    });

    if (error && !user) {
      return {
        user: null,
        error: (JSON.parse(error) as ErrorResponse).error.message,
        jwt,
      };
    }

    return { user, error: null, jwt };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : EXCEPTION_ERROR_MESSAGE.REGISTER;

    return {
      user: null,
      error: errorMessage,
      jwt: '',
    };
  }
};

export const logout = async () => {
  const encryptedValue = cookies().get('fcm_token')?.value;

  if (encryptedValue) {
    const token = await decrypt(encryptedValue);

    if (token) {
      await unregisterFCM({ token });

      cookies().delete('fcm_token');
    }
  }

  await signOut({
    redirect: false,
  });
};
