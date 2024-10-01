import { apiClient } from './api';
import { UserLogged } from '@/types';
import { API_ENDPOINT } from '@/constants';

export const getUserLogged = async (
  jwt: string,
): Promise<UserLogged | string> => {
  try {
    const res = await apiClient.get<UserLogged | string>(
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
    return errorMessage;
  }
};

export const getUsers = async (): Promise<UserLogged[] | string> => {
  try {
    const api = await apiClient.apiClientSession();

    const url = decodeURIComponent(`${API_ENDPOINT.USERS}`);
    const res = await api.get<UserLogged[]>(url, {
      next: { revalidate: 3600, tags: [API_ENDPOINT.USERS, 'all'] },
    });

    return res;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request get users';
    return errorMessage;
  }
};
