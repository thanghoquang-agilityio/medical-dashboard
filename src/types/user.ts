import {
  APIRelatedResponse,
  APIResponse,
  AppointmentModel,
  ImageModel,
  MetaResponse,
  NotificationModel,
  SpecialtyModel,
} from '@/types';

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
  id?: string;
  username: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  description?: string;
  rating?: number;
  tasks?: number;
  reviews?: number;
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
  avatar?: ImageModel;
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
  avatarUrl: string;
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
  | 'specialtyId'
> & {
  role: number;
  password?: string;
  specialtyId: number;
  avatar?: number | null;
};
