import {
  APIRelatedResponse,
  APIResponse,
  AppointmentModel,
  ImageResponse,
  MetaResponse,
  NotificationModel,
  SpecialtyModel,
} from '@/types';

// Define type User for Session
declare module 'next-auth' {
  interface Session {
    user: UserSession;
  }
}

// Role
export const enum ROLE {
  ADMIN = 'Admin',
  NORMAL_USER = 'Normal User',
}

export type RoleModel = {
  name: ROLE;
};

// User
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

export type UserLogged = Omit<
  UserModel,
  | 'avatar'
  | 'role'
  | 'specialtyId'
  | 'notificationsSent'
  | 'appointmentSent'
  | 'appointmentReceived'
> & {
  id: string;
  avatar?: ImageResponse;
  role: RoleModel;
  specialtyId?: SpecialtyModel;
  notificationsSent?: NotificationModel[];
  appointmentSent?: AppointmentModel[];
  appointmentReceived?: AppointmentModel[];
};

export type UserSession = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: string;
  token: string;
  remember: boolean;
};

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
  | 'id'
  | 'avatar'
  | 'role'
  | 'notificationsSent'
  | 'appointmentSent'
  | 'appointmentReceived'
> & {
  specialtyId: number;
  avatar: number;
};
