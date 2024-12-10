'use server';

import { getUserLogged } from './user';
import {
  UserSession,
  AuthResponse,
  LoginFormData,
  SignupFormData,
  ErrorResponse,
} from '@/types';
import {
  AUTH_ROUTES,
  AVATAR_THUMBNAIL,
  EXCEPTION_ERROR_MESSAGE,
  HOST_DOMAIN,
  ROUTE_ENDPOINT,
} from '@/constants';
import { signOut } from '@/config/auth';
import { cookies } from 'next/headers';
import { unregisterFCM } from './notificationFirebase';
import { decrypt } from '@/utils/encode';

export const login = async (
  body: LoginFormData,
): Promise<{ user: UserSession | null; error: string | null }> => {
  try {
    const response = await fetch(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.LOGIN}`,
      {
        method: 'POST',
        body: JSON.stringify({
          identifier: body.identifier,
          password: body.password,
        }),
      },
    );

    const { error, jwt, user }: AuthResponse = await response.json();

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
    const response = await fetch(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.SIGNUP}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    );

    const { error, user, jwt = '' }: AuthResponse = await response.json();

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
    redirectTo: AUTH_ROUTES.LOGIN,
  });
};
