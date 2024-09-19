import { NotificationResponse } from '@/types';

export const MOCK_NOTIFICATION_LIST: NotificationResponse[] = [
  {
    id: '1',
    attributes: {
      senderName: 'Alex Stanton',
      senderAvatar: 'https://i.pravatar.cc/300',
      isRead: '',
      info: JSON.parse('{"foo": "bar"}'),
    },
  },
  {
    id: ' 2',
    attributes: {
      senderName: 'Alex Stanton',
      senderAvatar: 'https://i.pravatar.cc/300',
      isRead: '1',
      info: JSON.parse('{"foo": "bar"}'),
    },
  },
];
