'use server';
import {
  APIRelatedResponse,
  ErrorResponse,
  RolesResponse,
  SendMoneyPayload,
  TransferPayload,
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

export const getUser = async (
  id: string,
): Promise<{ user: UserModel | null; error: string | null }> => {
  try {
    const { token = '' } = (await auth())?.user || {};

    const url = `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.GET_USER}/${id}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0, tags: [ROUTE_ENDPOINT.USER.GET_USER] },
    });

    const { error = null, ...user }: UserModel & { error: string | null } =
      await response.json();

    return { user: user, error };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.GET('user');
    return { user: null, error: errorMessage };
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
    const { token = '' } = (await auth())?.user || {};

    const url = `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.ADD_USER}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const { error = null, ...user }: UserModel & { error: string | null } =
      await response.json();

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
    const { token = '' } = (await auth())?.user || {};

    const url = `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.UPDATE_USER}/${id}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const { error = null, ...user }: UserModel & { error: string | null } =
      await response.json();

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
    const { token = '' } = (await auth())?.user || {};

    const url = `${HOST_DOMAIN}/${ROUTE_ENDPOINT.CHEMISTS.UPDATE_UNPUBLISH_CHEMISTS}/${id}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { error = null }: { error: string | null } = await response.json();

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
    const { token = '' } = (await auth())?.user || {};

    const url = `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.UPDATE_UNPUBLISH}/${id}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        publishedAt: null,
      }),
    });

    const { error = null, ...user }: UserModel & { error: string | null } =
      await response.json();

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
    const { token = '' } = (await auth())?.user || {};

    const url = `${HOST_DOMAIN}/${ROUTE_ENDPOINT.NOTIFICATIONS.UPDATE_UNPUBLISH_NOTIFICATION}/${id}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { error = null }: { error: string | null } = await response.json();

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
    const { token = '' } = (await auth())?.user || {};

    const url = `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.UPDATE_UNPUBLISH_APPOINTMENT}/${id}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { error = null }: { error: string | null } = await response.json();

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

export const addMoneyToUser = async (
  data: Pick<UserModel, 'balance'>,
  id: string,
) => {
  try {
    const { token = '' } = (await auth())?.user || {};

    const url = `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.ADD_MONEY}/${id}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const { error = null, ...user }: UserModel & { error: string | null } =
      await response.json();

    if (error) {
      return {
        user: null,
        error: (JSON.parse(error) as ErrorResponse).error.message,
      };
    }

    revalidateTag(API_ENDPOINT.USERS);

    return { user: user, error };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.ADD_MONEY;
    return { user: null, error: errorMessage };
  }
};

export const sendMoney = async ({
  senderId,
  senderBalance,
  senderSpending,
  receiverId,
  receiverBalance,
  amount,
}: SendMoneyPayload) => {
  try {
    const { token = '' } = (await auth())?.user || {};

    const senderUrl = `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.ADD_MONEY}/${senderId}`;

    const receiverUrl = `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.ADD_MONEY}/${receiverId}`;

    const transferUrl = `${HOST_DOMAIN}/${ROUTE_ENDPOINT.TRANSFER.ADD_TRANSFER}`;

    const senderPayload: Pick<UserModel, 'balance' | 'spendingMoney'> = {
      balance: senderBalance,
      spendingMoney: senderSpending,
    };

    const receiverPayload: Pick<UserModel, 'balance'> = {
      balance: receiverBalance,
    };

    const transferPayload: APIRelatedResponse<TransferPayload> = {
      data: {
        senderId,
        receiverId,
        amount,
      },
    };

    const senderPromise = fetch(senderUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(senderPayload),
    });

    const receiverPromise = fetch(receiverUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(receiverPayload),
    });

    const transferPromise = await fetch(transferUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transferPayload),
    });

    const { error: transferError = null } = await transferPromise.json();

    if (transferError)
      return {
        user: null,
        error: (JSON.parse(transferError) as ErrorResponse).error.message,
      };

    const [senderResponse, receiverResponse] = await Promise.all([
      senderPromise,
      receiverPromise,
    ]);

    const [
      { error: senderError = null, ...sender },
      { error: receiverError = null, ...receiver },
    ]: Array<UserModel & { error: string | null }> = await Promise.all([
      senderResponse.json(),
      receiverResponse.json(),
    ]);

    if (senderError) {
      return {
        user: null,
        error: (JSON.parse(senderError) as ErrorResponse).error.message,
      };
    }

    if (receiverError) {
      return {
        user: null,
        error: (JSON.parse(receiverError) as ErrorResponse).error.message,
      };
    }

    revalidateTag(API_ENDPOINT.USERS);
    revalidateTag(API_ENDPOINT.TRANSFERS);

    return { user: [sender, receiver], error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.SEND_MONEY;
    return { user: null, error: errorMessage };
  }
};
