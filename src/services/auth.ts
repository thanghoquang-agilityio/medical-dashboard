// import { logout as logoutAuth } from '@/config/auth';
import { apiClient } from './api';
import { getUserLogged } from './user';
import { UserModel, AuthResponse, SignInForm, SignUpForm } from '@/types';
import { API_ENDPOINT } from '@/constants';

export const login = async (
  body: SignInForm,
): Promise<(UserModel & { token: string }) | null> => {
  try {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINT.AUTH, {
      body,
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
      ...user,
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
  body: SignUpForm,
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

// TODO: update logout config
// export const logout = async () => await logoutAuth();
