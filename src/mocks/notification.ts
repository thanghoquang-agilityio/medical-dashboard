import { NotificationResponse } from '@/types';

export const MOCK_NOTIFICATION_LIST: NotificationResponse[] = [
  {
    id: '1',
    attributes: {
      senderName: 'Alex Stanton',
      senderAvatar: 'https://i.pravatar.cc/300',
      isRead: false,
      info: JSON.parse(
        '{"id": "2", "status": 0, "startTime": "2024-09-12T02:00:00.000Z", "durationTime": "01:00:00", "content": "updated"}',
      ),
    },
  },
  {
    id: '2',
    attributes: {
      senderName: 'Alex Stanton',
      senderAvatar: 'https://i.pravatar.cc/300',
      isRead: true,
      info: JSON.parse(
        '{"id": "2", "status": 0, "startTime": "2024-09-12T02:00:00.000Z", "durationTime": "01:00:00", "content": "deleted"}',
      ),
    },
  },
];
