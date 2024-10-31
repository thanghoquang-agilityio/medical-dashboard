'use server';

import {
  getNotifications as getNotificationsService,
  addNotification as addNotificationService,
} from '@/services';
import {
  FetchDataProps,
  NotificationDataResponse,
  NotificationPayload,
} from '@/types';

export const getNotifications = async ({
  searchParams = new URLSearchParams(),
  options,
}: FetchDataProps) => {
  const data = await getNotificationsService({ searchParams, options });

  return data;
};

export const addNotification = async (
  appointment: NotificationPayload,
): Promise<NotificationDataResponse> =>
  await addNotificationService(appointment);
