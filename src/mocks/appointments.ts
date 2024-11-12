import { AVATAR_THUMBNAIL } from '@/constants';
import { APIResponse, AppointmentModel } from '@/types';

export const MOCK_APPOINTMENTS: APIResponse<AppointmentModel>[] = [
  {
    id: '1',
    attributes: {
      startTime: '2026-09-11T06:30:00.000Z',
      durationTime: '01:30:00',
      status: 0,
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
            avatar: AVATAR_THUMBNAIL,
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
            avatar: AVATAR_THUMBNAIL,
          },
        },
      },
    },
  },
  {
    id: '2',
    attributes: {
      startTime: '2026-09-12T02:00:00.000Z',
      durationTime: '01:00:00',
      status: 0,
      receiverId: {
        data: {
          id: '6',
          attributes: {
            username: 'ThangHq',
            email: 'thang.hoquang@asnet.com.vn',
            description:
              "Hi, I'm Thang Ho Quang. I'm a software engineer in AgilityIO company. I'm so happy for my job.",
            rating: 5,
            tasks: 40,
            reviews: 600,
            avatar: AVATAR_THUMBNAIL,
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
            avatar: AVATAR_THUMBNAIL,
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
            avatar: AVATAR_THUMBNAIL,
          },
        },
      },
      senderId: {
        data: {
          id: '6',
          attributes: {
            username: 'ThangHq',
            email: 'thang.hoquang@asnet.com.vn',
            description:
              "Hi, I'm Thang Ho Quang. I'm a software engineer in AgilityIO company. I'm so happy for my job.",
            rating: 5,
            tasks: 40,
            reviews: 600,
            avatar: AVATAR_THUMBNAIL,
          },
        },
      },
    },
  },
];
