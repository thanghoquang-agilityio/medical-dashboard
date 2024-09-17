import { NotificationResponse } from '@/types';

export const MOCK_NOTIFICATION_LIST: NotificationResponse[] = [
  {
    id: '1',
    attributes: {
      senderName: 'Alex Stanton',
      senderAvatar: 'https://i.pravatar.cc/300',
      isRead: false,
      info: JSON.parse('{"foo": "bar"}'),
    },
  },
  {
    id: ' 2',
    attributes: {
      senderName: 'Alex Stanton',
      senderAvatar: 'https://i.pravatar.cc/300',
      isRead: true,
      info: JSON.parse('{"foo": "bar"}'),
    },
  },
];
