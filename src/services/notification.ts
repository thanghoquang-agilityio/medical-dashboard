// Constants
import { API_ENDPOINT } from '@/constants';

// Types
import { NotificationsResponse, NotificationsDataResponse } from '@/types';

// Services
import { apiClient } from '@/services';

interface FetchDataProps {
  searchParams?: URLSearchParams;
  options?: RequestInit;
}

export const getNotifications = async ({
  searchParams = new URLSearchParams(),
  options = { next: { tags: [API_ENDPOINT.NOTIFICATIONS] } },
}: FetchDataProps = {}): NotificationsDataResponse => {
  try {
    const api = await apiClient.apiClientSession();
    const url = decodeURIComponent(
      `/${API_ENDPOINT.NOTIFICATIONS}?${searchParams.toString()}`,
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
