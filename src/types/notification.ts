import {
  APIRelatedResponse,
  APIResponse,
  MetaResponse,
  STATUS_TYPE_RESPONSE,
  UserModel,
} from '@/types';

export interface InfoModel {
  id: string;
  status: keyof typeof STATUS_TYPE_RESPONSE;
  startTime: string;
  durationTime: string;
  content: string;
}

export interface NotificationModel {
  senderName: string;
  senderAvatar: string;
  isRead: string;
  info: InfoModel;
  type: keyof typeof STATUS_TYPE_RESPONSE;
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
