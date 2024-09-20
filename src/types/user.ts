import {
  APIRelatedResponse,
  APIResponse,
  AppointmentModel,
  ImageResponse,
  MetaResponse,
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

export type UserResponse = APIResponse<UserModel>;

export type UsersDataResponse = Promise<
  { users: UserResponse[]; error?: Error } & MetaResponse
>;

export type UsersResponse = {
  data: UserResponse[];
  meta: MetaResponse;
};

export type UserPayload = Omit<
  UserModel,
  'senderId' | 'notificationsSent' | 'appointmentSent' | 'appointmentReceived'
> & {
  specialtyId: number;
  avatar: number;
};
