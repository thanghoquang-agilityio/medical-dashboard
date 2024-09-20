import {
  APIRelatedResponse,
  APIResponse,
  AppointmentModel,
  ImageResponse,
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
type AppointmentList =
  | APIRelatedResponse<APIResponse<AppointmentModel>[]>
  | AppointmentModel[];
export interface UserModel {
  id?: string;
  username: string;
  email: string;
  avatar?: APIRelatedResponse<ImageResponse> | ImageResponse;
  description: string;
  rating: number;
  tasks: number;
  reviews: number;
  role?: RoleModel;
  specialtyId?:
    | APIRelatedResponse<APIResponse<SpecialtyModel>>
    | SpecialtyModel;
  notificationsSent?:
    | APIRelatedResponse<APIResponse<NotificationModel>[]>
    | NotificationModel[];
  appointmentSent?: AppointmentList;
  appointmentReceived?: AppointmentList;
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
  | 'id'
  | 'avatar'
  | 'role'
  | 'senderId'
  | 'notificationsSent'
  | 'appointmentSent'
  | 'appointmentReceived'
> & {
  specialtyId: number;
  avatar: number;
};
