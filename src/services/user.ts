import { apiClient } from './api';
import { UserLogged } from '@/types';
import { API_ENDPOINT } from '@/constants';

export const getUserLogged = async (
  jwt: string,
): Promise<UserLogged | null> => {
  try {
    const res = await apiClient.get<UserLogged | null>(
      `${API_ENDPOINT.USERS}/me?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );

    return res;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request get user logged';
    throw new Error(errorMessage);
  }
};
