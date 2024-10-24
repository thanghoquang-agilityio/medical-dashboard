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

// Hooks
import { useFcmToken } from '@/hooks';
import { useToast } from '@/context/toast';

// Services
import { sendNotification } from '@/services/notificationFirebase';

export const useNotification = ({
  userLogged,
}: {
  userLogged: UserLogged | null;
}) => {
  const openToast = useToast();
  const { token } = useFcmToken();

  const handleCreateNotification = useCallback(
    async (appointment: AppointmentResponse, action: string) => {
      const { id = '', attributes } = appointment || {};
      const {
        status = 0,
        startTime = '',
        durationTime = '',
      } = attributes || {};

      const { id: userId = '', username = '', avatar = '' } = userLogged || {};

      const notification: NotificationPayload = {
        senderName: username,
        senderAvatar: avatar,
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

      if (errorAddNotification) {
        openToast({
          message: ERROR_MESSAGE.CREATE('notification'),
          type: STATUS_TYPE.ERROR,
        });
        return;
      }

      token &&
        (await sendNotification({
          message: 'You have new notification',
        }));
    },
    [openToast, token, userLogged],
  );

  return {
    handleCreateNotification,
  };
};
