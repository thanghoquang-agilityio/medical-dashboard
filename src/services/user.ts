'use server';

import { apiClient } from './api';
import {
  ErrorResponse,
  RolesResponse,
  UserLogged,
  UserModel,
  UserPayload,
} from '@/types';
import { API_ENDPOINT } from '@/constants';
import { revalidateTag } from 'next/cache';

export const getUserLogged = async (
  jwt: string,
): Promise<{ user: UserLogged | null; error: string | null }> => {
  try {
    const { error = null, ...user } = await apiClient.get<
      UserLogged & { error: string | null }
    >(`${API_ENDPOINT.USERS}/me?populate=*`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      next: { revalidate: 3600, tags: [API_ENDPOINT.USERS, 'logged'] },
    });
    return { user: user, error };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request get user logged';
    return { user: null, error: errorMessage };
  }
};

export const getUsers = async (): Promise<{
  users: UserLogged[];
  error: string | null;
}> => {
  try {
    const api = await apiClient.apiClientSession();

    const url = decodeURIComponent(`${API_ENDPOINT.USERS}`);
    const { error = null, ...user } = await api.get<
      UserLogged[] & { error: string | null }
    >(url, {
      next: { revalidate: 3600, tags: [API_ENDPOINT.USERS] },
    });

    const usersArray = Object.values(user) as UserLogged[];

    if (error) return { users: [], error };

    return { users: usersArray, error };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request get users';

    return { users: [], error: errorMessage };
  }
};

export const getUserRoles = async (): Promise<RolesResponse> => {
  try {
    const { roles, error = null } = await apiClient.get<RolesResponse>(
      `${API_ENDPOINT.PERMISSIONS}/roles`,
      {
        next: { revalidate: 3600, tags: [API_ENDPOINT.PERMISSIONS] },
      },
    );

    if (error) return { roles: [], error };

    return { roles: roles, error };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request get user roles';

    return { roles: [], error: errorMessage };
  }
};

export const addUser = async (
  data: UserPayload,
): Promise<{ user: UserModel | null; error: string | null }> => {
  try {
    const api = await apiClient.apiClientSession();

    const { error = null, ...user } = await api.post<
      UserModel & { error: string | null }
    >(`${API_ENDPOINT.USERS}`, {
      body: data,
    });

    if (error) {
      return {
        user: null,
        error: (JSON.parse(error) as ErrorResponse).error.message,
      };
    }

    revalidateTag(API_ENDPOINT.CHEMISTS);

    return { user: user, error };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request add user';
    return { user: null, error: errorMessage };
  }
};

export const updateUser = async (
  id: string,
  data: UserPayload,
): Promise<{ user: UserModel | null; error: string | null }> => {
  try {
    const api = await apiClient.apiClientSession();

    const { error = null, ...user } = await api.put<
      UserModel & { error: string | null }
    >(`${API_ENDPOINT.USERS}/${id}`, {
      body: data,
    });

    if (error) {
      return {
        user: null,
        error: (JSON.parse(error) as ErrorResponse).error.message,
      };
    }

    revalidateTag(API_ENDPOINT.CHEMISTS);

    return { user: user, error };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request update user';
    return { user: null, error: errorMessage };
  }
};

export const updatePublishUser = async (
  id: string,
): Promise<{ user: UserModel | null; error: string | null }> => {
  try {
    const now = new Date();
    const formattedDate = now.toISOString();
    const { error = null, ...user } = await apiClient.put<
      UserModel & { error: string | null }
    >(`${API_ENDPOINT.USERS}/${id}`, {
      body: {
        publishedAt: formattedDate,
      },
    });

    if (error) {
      return {
        user: null,
        error: (JSON.parse(error) as ErrorResponse).error.message,
      };
    }

    revalidateTag(API_ENDPOINT.USERS);
    revalidateTag(API_ENDPOINT.CHEMISTS);

    return { user: user, error };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request update user';
    return { user: null, error: errorMessage };
  }
};

const updateUnpublishChemist = async (
  id: string,
): Promise<{ error: string | null }> => {
  try {
    const api = await apiClient.apiClientSession();

    const { error = null } = await api.put<{ error: string | null }>(
      `${API_ENDPOINT.CHEMISTS}/unpublish/${id}`,
    );

    if (error) {
      return {
        error: (JSON.parse(error) as ErrorResponse).error.message,
      };
    }

    revalidateTag(API_ENDPOINT.CHEMISTS);

    return { error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request update user';
    return { error: errorMessage };
  }
};

export const updateUnpublishUser = async (
  id: string,
): Promise<{ user: UserModel | null; error: string | null }> => {
  try {
    const api = await apiClient.apiClientSession();

    const { error = null, ...user } = await api.put<
      UserModel & { error: string | null }
    >(`${API_ENDPOINT.USERS}/${id}`, {
      body: {
        publishedAt: null,
      },
    });

    if (error) {
      return {
        user: null,
        error: (JSON.parse(error) as ErrorResponse).error.message,
      };
    }

    revalidateTag(API_ENDPOINT.USERS);

    await updateUnpublishChemist(id);

    return { user: user, error };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request update user';
    return { user: null, error: errorMessage };
  }
};

export const updateUnpublishNotification = async (
  id: string,
): Promise<{ error: string | null }> => {
  try {
    const api = await apiClient.apiClientSession();

    const { error = null } = await api.put<{ error: string | null }>(
      `${API_ENDPOINT.NOTIFICATIONS}/unpublish/${id}`,
    );

    if (error) {
      return {
        error: (JSON.parse(error) as ErrorResponse).error.message,
      };
    }

    revalidateTag(API_ENDPOINT.NOTIFICATIONS);

    return { error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request update user';
    return { error: errorMessage };
  }
};

export const updateUnpublishAppointment = async (
  id: string,
): Promise<{ error: string | null }> => {
  try {
    const api = await apiClient.apiClientSession();

    const { error = null } = await api.put<{ error: string | null }>(
      `${API_ENDPOINT.APPOINTMENTS}/unpublish/${id}`,
    );

    if (error) {
      return {
        error: (JSON.parse(error) as ErrorResponse).error.message,
      };
    }

    revalidateTag(API_ENDPOINT.APPOINTMENTS);

    return { error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request update user';
    return { error: errorMessage };
  }
};
