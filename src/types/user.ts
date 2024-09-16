import {
  APIRelatedResponse,
  APIResponse,
  AppointmentModel,
  ImageResponse,
  NotificationModel,
  SpecialtyModel,
} from '@/types';

export interface UserModel {
  username: string;
  email: string;
  avatar?: APIRelatedResponse<ImageResponse>;
  description: string;
  rating: number;
  tasks: number;
  reviews: number;
  specialtyId?: APIRelatedResponse<APIResponse<SpecialtyModel>>;
  notificationsSent?: APIRelatedResponse<APIResponse<NotificationModel>[]>;
  appointmentSent?: APIRelatedResponse<APIResponse<AppointmentModel>[]>;
  appointmentReceived?: APIRelatedResponse<APIResponse<AppointmentModel>[]>;
}

export type UserPayload = Omit<
  UserModel,
  'senderId' | 'notificationsSent' | 'appointmentSent' | 'appointmentReceived'
> & {
  specialtyId: number;
  avatar: number;
};
