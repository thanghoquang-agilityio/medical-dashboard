import {
  APIRelatedResponse,
  APIResponse,
  MetaResponse,
  UserModel,
} from '@/types';

export interface NotificationModel {
  senderName: string;
  senderAvatar: string;
  isRead: boolean;
  info: JSON;
  senderId?: APIRelatedResponse<APIResponse<UserModel>>;
}

export type NotificationResponse = APIResponse<NotificationModel>;

export type NotificationsDataResponse = Promise<
  { Notifications: NotificationResponse[]; error?: Error } & MetaResponse
>;

export type NotificationsResponse = {
  data: NotificationResponse[];
  meta: MetaResponse;
};

export type NotificationPayload = Omit<NotificationModel, 'senderId'> & {
  senderId: number;
};
