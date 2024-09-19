import {
  APIRelatedResponse,
  APIResponse,
  STATUS_TYPE_RESPONSE,
  UserModel,
} from '@/types';

export const getObjectValue = <T, Key extends keyof T>(obj: T, key: string) => {
  return obj[key as Key] as string;
};

export const getContentNotification = ({
  userId,
  senderId,
  type,
  time,
}: {
  userId: string;
  senderId: APIRelatedResponse<APIResponse<UserModel>>;
  type: keyof typeof STATUS_TYPE_RESPONSE;
  time: string;
}) => {
  const { id = '', attributes } = senderId.data || {};
  const { username = '' } = attributes || {};

  const name = userId === id ? 'You' : username;
  switch (type) {
    case 1:
      return `${name} have been updated the appointment at ${time}`;
    case 2:
      return `${name} have been deleted the appointment at ${time}`;
    default:
      return `${name} have been created the appointment at ${time}`;
  }
};
