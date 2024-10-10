'use client';

import { useCallback } from 'react';
import {
  AppointmentResponse,
  NotificationPayload,
  STATUS_TYPE,
  UserLogged,
} from '@/types';
import { ERROR_MESSAGE, NOTIFICATION_CONTENT } from '@/constants';
import { addNotification } from '@/actions/notification';
import { useToast } from '@/context/toast';

export const useCreateNotification = ({
  userLogged,
}: {
  userLogged: UserLogged | null;
}) => {
  const openToast = useToast();

  const handleCreateNotification = useCallback(
    async (appointment: AppointmentResponse, action: string) => {
      const { id = '', attributes } = appointment || {};
      const {
        status = 0,
        startTime = '',
        durationTime = '',
      } = attributes || {};
      const { id: userId = '', username = '', avatar } = userLogged || {};
      const { url = '' } = avatar || {};

      const notification: NotificationPayload = {
        senderName: username,
        senderAvatar: url,
        isRead: false,
        info: {
          id,
          status,
          startTime,
          durationTime,
          content: NOTIFICATION_CONTENT(action),
        },
        senderId: userId,
      };

      const { error: errorAddNotification } =
        await addNotification(notification);
      if (errorAddNotification)
        openToast({
          message: ERROR_MESSAGE.CREATE('notification'),
          type: STATUS_TYPE.ERROR,
        });
    },
    [openToast, userLogged],
  );

  return {
    handleCreateNotification,
  };
};
