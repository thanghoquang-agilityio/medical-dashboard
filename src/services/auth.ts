'use server';

import { apiClient } from './api';
import { getUserLogged } from './user';
import {
  UserSession,
  AuthResponse,
  LoginFormData,
  SignupFormData,
} from '@/types';
import { API_ENDPOINT } from '@/constants';

export const login = async (
  body: LoginFormData,
): Promise<UserSession | null> => {
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
    const { id = '', avatar, role, username = '', email = '' } = profile || {};
    const { attributes } = avatar || {};
    const { url = '' } = attributes || {};
    const { name = '' } = role || {};

    if (!profile) {
      return null;
    }

    const data = {
      id: id,
      token: jwt,
      remember: body.remember,
      role: name,
      avatar: url,
      username: username,
      email: email,
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
