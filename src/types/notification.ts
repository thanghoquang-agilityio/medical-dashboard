import {
  APIRelatedResponse,
  APIResponse,
  AppointmentStatus,
  MetaResponse,
  UserModel,
} from '@/types';

export interface InfoModel {
  id: string;
  status: AppointmentStatus;
  startTime: string;
  durationTime: string;
  content: string;
}

export interface NotificationModel {
  senderName: string;
  senderAvatar: string;
  isRead: string;
  info: InfoModel;
  senderId?: APIRelatedResponse<APIResponse<UserModel>>;
  createdAt?: string;
}

export type NotificationResponse = APIResponse<NotificationModel>;

export type NotificationDataResponse = {
  notification: NotificationResponse | null;
  error: string | null;
};

export type NotificationsDataResponse = Promise<
  { notifications: NotificationResponse[]; error: string | null } & MetaResponse
>;

export type NotificationsResponse = {
  data: NotificationResponse[];
  meta: MetaResponse;
};

export type NotificationPayload = Omit<NotificationModel, 'senderId'> & {
  senderId: number;
};
