import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINT } from '@/constants';

// Types
import {
  NotificationsResponse,
  NotificationsDataResponse,
  FetchDataProps,
  NotificationPayload,
  NotificationResponse,
  APIRelatedResponse,
} from '@/types';

// Services
import { apiClient } from '@/services';

export const getNotifications = async ({
  searchParams = new URLSearchParams(),
  options = { next: { tags: [API_ENDPOINT.NOTIFICATIONS] } },
}: FetchDataProps): NotificationsDataResponse => {
  try {
    const api = await apiClient.apiClientSession();
    const url = decodeURIComponent(
      `${API_ENDPOINT.NOTIFICATIONS}?${searchParams.toString()}`,
    );
    const { data, meta } = await api.get<NotificationsResponse>(url, {
      ...options,
      next: { revalidate: 3600 },
    });

    return {
      notifications: data,
      ...meta,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request get notifications';

    throw new Error(errorMessage);
  }
};

export const addNotification = async (
  notification: NotificationPayload,
): Promise<NotificationResponse | string> => {
  try {
    const api = await apiClient.apiClientSession();
    const { data } = await api.post<APIRelatedResponse<NotificationResponse>>(
      `${API_ENDPOINT.NOTIFICATIONS}`,
      {
        body: {
          data: notification,
        },
      },
    );

    revalidateTag(`${API_ENDPOINT.NOTIFICATIONS}/dashboard`);
    revalidateTag(API_ENDPOINT.NOTIFICATIONS);

    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in add notification';

    return errorMessage;
  }
};

export const updateNotification = async (
  id: string,
  notification: NotificationPayload,
): Promise<NotificationResponse | string> => {
  try {
    const api = await apiClient.apiClientSession();
    const { data } = await api.put<APIRelatedResponse<NotificationResponse>>(
      `${API_ENDPOINT.NOTIFICATIONS}/${id}`,
      {
        body: {
          data: {
            ...notification,
          },
        },
      },
    );

    revalidateTag(`${API_ENDPOINT.NOTIFICATIONS}/dashboard`);
    revalidateTag(API_ENDPOINT.NOTIFICATIONS);

    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in update notification';

    return errorMessage;
  }
};

export const deleteNotification = async (id: string) => {
  try {
    const api = await apiClient.apiClientSession();
    const response = await api.delete<APIRelatedResponse<NotificationResponse>>(
      `/${API_ENDPOINT.NOTIFICATIONS}/${id}`,
    );
    if (response) {
      revalidateTag(`${API_ENDPOINT.NOTIFICATIONS}/dashboard`);
      revalidateTag(API_ENDPOINT.NOTIFICATIONS);

      return true;
    }

    return false;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in delete notification';

    return errorMessage;
  }
};
