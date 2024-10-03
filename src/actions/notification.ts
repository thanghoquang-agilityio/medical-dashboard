'use server';

import { getNotifications as getNotificationsService } from '@/services';
import { FetchDataProps } from '@/types';

export const getNotifications = async ({
  searchParams = new URLSearchParams(),
  options,
}: FetchDataProps) => {
  const data = await getNotificationsService({ searchParams, options });
  return data;
};
