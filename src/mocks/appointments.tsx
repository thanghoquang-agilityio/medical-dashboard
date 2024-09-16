'use client';

import {
  APIResponse,
  AppointmentModel,
  ColumnType,
  STATUS_TYPE_RESPONSE,
} from '@/types';
import { Status, Text } from '@/components/ui';
import { formatNewDate, formatTimeAppointment } from '@/utils';

export const MOCK_COLUMNS_APPOINTMENTS: ColumnType<AppointmentModel>[] = [
  {
    key: 'senderId',
    title: 'Sender',
    customNode: (_, item) => (
      <Text variant="primary" size="xs">
        {item.senderId.data.attributes.username}
      </Text>
    ),
  },
  {
    key: 'receiverId',
    title: 'Receiver',
    customNode: (_, item) => (
      <Text variant="primary" size="xs">
        {item.receiverId.data.attributes.username}
      </Text>
    ),
  },
  {
    key: 'durationTime',
    title: 'Duration',
    customNode: (_, item) => (
      <Text variant="primary" size="xs">
        {formatTimeAppointment({
          start: item.startTime,
          duration: item.durationTime,
        })}
      </Text>
    ),
  },
  {
    key: 'startTime',
    title: 'Date',
    customNode: (_, item) => (
      <Text variant="primary" size="xs">
        {formatNewDate(item.startTime)}
      </Text>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    customNode: (_, item) => (
      <Status status={STATUS_TYPE_RESPONSE[item.status]} />
    ),
  },
];

export const MOCK_APPOINTMENTS: APIResponse<AppointmentModel>[] = [
  {
    id: '1',
    attributes: {
      startTime: '2024-09-11T06:30:00.000Z',
      durationTime: '01:30:00',
      status: 2,
      receiverId: {
        data: {
          id: '2',
          attributes: {
            username: 'Jessica Jane',
            email: 'jessicajane@gmail.com.vn',
            description:
              "Hi, I'm Jessica Jane. Lorem Ipsum is simply dummy text of the printing and typesetting for it.",
            rating: 5,
            tasks: 40,
            reviews: 600,
          },
        },
      },
      senderId: {
        data: {
          id: '3',
          attributes: {
            username: 'Alex Stanton',
            email: 'alexstanton@gmail.com',
            description:
              "Hi, I'm Alex Stanton. Happy for all problem happen with me. Let's smile.",
            rating: 5,
            tasks: 40,
            reviews: 600,
          },
        },
      },
    },
  },
  {
    id: '2',
    attributes: {
      startTime: '2024-09-12T02:00:00.000Z',
      durationTime: '01:00:00',
      status: 0,
      receiverId: {
        data: {
          id: '1',
          attributes: {
            username: 'ThangHq',
            email: 'thang.hoquang@asnet.com.vn',
            description:
              "Hi, I'm Thang Ho Quang. I'm a software engineer in AgilityIO company. I'm so happy for my job.",
            rating: 5,
            tasks: 40,
            reviews: 600,
          },
        },
      },
      senderId: {
        data: {
          id: '3',
          attributes: {
            username: 'Alex Stanton',
            email: 'alexstanton@gmail.com',
            description:
              "Hi, I'm Alex Stanton. Happy for all problem happen with me. Let's smile.",
            rating: 5,
            tasks: 40,
            reviews: 600,
          },
        },
      },
    },
  },
  {
    id: '3',
    attributes: {
      startTime: '2024-09-13T03:00:00.000Z',
      durationTime: '01:00:00',
      status: 1,
      receiverId: {
        data: {
          id: '3',
          attributes: {
            username: 'Alex Stanton',
            email: 'alexstanton@gmail.com',
            description:
              "Hi, I'm Alex Stanton. Happy for all problem happen with me. Let's smile.",
            rating: 5,
            tasks: 40,
            reviews: 600,
          },
        },
      },
      senderId: {
        data: {
          id: '1',
          attributes: {
            username: 'ThangHq',
            email: 'thang.hoquang@asnet.com.vn',
            description:
              "Hi, I'm Thang Ho Quang. I'm a software engineer in AgilityIO company. I'm so happy for my job.",
            rating: 5,
            tasks: 40,
            reviews: 600,
          },
        },
      },
    },
  },
];
