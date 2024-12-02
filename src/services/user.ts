'use server';

import { apiClient } from './api';
import {
  ErrorResponse,
  RolesResponse,
  UserLogged,
  UserModel,
  UserPayload,
} from '@/types';
import {
  API_ENDPOINT,
  EXCEPTION_ERROR_MESSAGE,
  HOST_DOMAIN,
  ROUTE_ENDPOINT,
} from '@/constants';
import { revalidateTag } from 'next/cache';
import { auth } from '@/config/auth';

export const getUserLogged = async (
  jwt: string,
): Promise<{ user: UserLogged | null; error: string | null }> => {
  try {
    const response = await fetch(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.GET_LOGGED}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        next: { revalidate: 3600, tags: [API_ENDPOINT.USERS, 'logged'] },
      },
    );

    const { error = null, ...user }: UserLogged & { error: string | null } =
      await response.json();

    return { user: user, error };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.GET('user logged');
    return { user: null, error: errorMessage };
  }
};

export const getUsers = async (): Promise<{
  users: UserLogged[];
  error: string | null;
}> => {
  try {
    const { token = '' } = (await auth())?.user || {};

    const url = decodeURIComponent(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.GET_USERS}?filters[publishedAt][$notNull]=true`,
    );

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { error = null, ...user }: UserLogged[] & { error: string | null } =
      await response.json();

    const usersArray = Object.values(user) as UserLogged[];

    if (error) return { users: [], error };

    return { users: usersArray, error };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.GET('users');

    return { users: [], error: errorMessage };
  }
};

export const getUserRoles = async (): Promise<RolesResponse> => {
  try {
    const url = `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.GET_USER_ROLES}`;

    const response = await fetch(url, {
      next: { revalidate: 3600, tags: [API_ENDPOINT.PERMISSIONS] },
    });

    const { roles, error = null }: RolesResponse = await response.json();

    if (error) return { roles: [], error };

    return { roles: roles, error };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.GET('user roles');

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
        : EXCEPTION_ERROR_MESSAGE.ADD('user');
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
        : EXCEPTION_ERROR_MESSAGE.UPDATE('user');
    return { user: null, error: errorMessage };
  }
};

export const updatePublishUser = async (
  id: string,
): Promise<{ user: UserModel | null; error: string | null }> => {
  try {
    const response = await fetch(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.UPDATE_PUBLISH}`,
      {
        method: 'PUT',
        body: id,
      },
    );

    const { error = null, ...user }: UserModel & { error: string | null } =
      await response.json();

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
        : EXCEPTION_ERROR_MESSAGE.UPDATE('user');
    return { user: null, error: errorMessage };
  }
};

export const updateUnpublishChemist = async (
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
        : EXCEPTION_ERROR_MESSAGE.UPDATE('user');
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
        : EXCEPTION_ERROR_MESSAGE.UPDATE('user');
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
        : EXCEPTION_ERROR_MESSAGE.UPDATE('user');
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
        : EXCEPTION_ERROR_MESSAGE.UPDATE('user');
    return { error: errorMessage };
  }
};
