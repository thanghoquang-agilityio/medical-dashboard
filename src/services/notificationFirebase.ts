'use server';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/config/firebase.config';
import { auth } from '@/config/auth';

import { getUserLogged } from './user';

import { AppointmentModel, NotificationPayload } from '@/types';
import { NOTIFICATION_FIREBASE } from '@/constants';

export const createNotifications = async ({
  message,
  appointment,
  idAppointment,
}: {
  message: string;
  appointment: AppointmentModel;
  idAppointment: string;
}) => {
  const { token = '' } = (await auth())?.user || {};
  const {
    id = '',
    avatar,
    username = '',
  } = (await getUserLogged(token)).user || {};
  const { url = '' } = avatar || {};
  const { startTime, status, durationTime } = appointment;
  const notification: NotificationPayload = {
    senderName: username,
    senderAvatar: url,
    isRead: false,
    senderId: id,
    info: {
      id: idAppointment,
      content: message,
      startTime,
      status,
      durationTime,
    },
  };
  const docRef = await addDoc(
    collection(db, NOTIFICATION_FIREBASE),
    notification,
  );

  return docRef.id;
};
