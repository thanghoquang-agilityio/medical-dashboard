import { AVATAR_THUMBNAIL } from '@/constants';
import {
  ROLE,
  RolePermission,
  UserLogged,
  UserModel,
  UserSession,
} from '@/types';

export const MOCK_USER_LIST = {
  data: [
    {
      id: '6',
      attributes: {
        createdAt: '2024-09-20T03:02:27.417Z',
        updatedAt: '2024-09-20T03:02:31.304Z',
        publishedAt: '2024-09-20T03:02:31.303Z',
        users_permissions_user: {
          data: {
            id: '8',
            attributes: {
              username: 'Alex Stanton',
              email: 'alexstanton@gmail.com',
              provider: 'local',
              confirmed: false,
              blocked: false,
              description:
                "Hi, I'm Alex Stanton. Happy for all problem happen with me. Let's smile.",
              rating: 5,
              tasks: 22,
              reviews: 321,
              createdAt: '2024-09-19T02:44:04.643Z',
              updatedAt: '2024-09-19T02:44:04.643Z',
              avatar: {
                data: {
                  id: '10',
                  attributes: {
                    name: 'kyle.webp',
                    alternativeText: null,
                    caption: null,
                    width: 305,
                    height: 305,
                    formats: {
                      thumbnail: {
                        name: 'thumbnail_kyle.webp',
                        hash: 'thumbnail_kyle_554a95ac44',
                        ext: '.webp',
                        mime: 'image/webp',
                        path: null,
                        width: 156,
                        height: 156,
                        size: 7.38,
                        sizeInBytes: 7384,
                        url: '/uploads/thumbnail_kyle_554a95ac44.webp',
                      },
                    },
                    hash: 'kyle_554a95ac44',
                    ext: '.webp',
                    mime: 'image/webp',
                    size: 26.92,
                    url: '/uploads/kyle_554a95ac44.webp',
                    previewUrl: null,
                    provider: 'local',
                    provider_metadata: null,
                    createdAt: '2024-09-19T02:42:30.629Z',
                    updatedAt: '2024-09-24T08:37:10.656Z',
                  },
                },
              },
              role: {
                data: {
                  id: '8',
                  attributes: {
                    name: 'Normal User',
                    description:
                      'Default role given to authenticated user with role normal user.',
                    type: 'normal_user',
                    createdAt: '2024-09-19T02:36:43.012Z',
                    updatedAt: '2024-09-19T02:36:43.012Z',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 7,
      attributes: {
        createdAt: '2024-09-20T03:02:36.314Z',
        updatedAt: '2024-09-20T03:02:36.898Z',
        publishedAt: '2024-09-20T03:02:36.897Z',
        users_permissions_user: {
          data: {
            id: '9',
            attributes: {
              username: 'Anna White',
              email: 'anna_white@asnet.com.vn',
              provider: 'local',
              confirmed: false,
              blocked: false,
              description: null,
              rating: 5,
              tasks: 40,
              reviews: 600,
              createdAt: '2024-09-19T02:44:45.016Z',
              updatedAt: '2024-09-19T02:44:45.016Z',
              avatar: {
                data: {
                  id: '8',
                  attributes: {
                    name: 'white.webp',
                    alternativeText: null,
                    caption: null,
                    width: 305,
                    height: 305,
                    formats: {
                      thumbnail: {
                        name: 'thumbnail_white.webp',
                        hash: 'thumbnail_white_8b3aabe189',
                        ext: '.webp',
                        mime: 'image/webp',
                        path: null,
                        width: 156,
                        height: 156,
                        size: 7.73,
                        sizeInBytes: 7726,
                        url: '/uploads/thumbnail_white_8b3aabe189.webp',
                      },
                    },
                    hash: 'white_8b3aabe189',
                    ext: '.webp',
                    mime: 'image/webp',
                    size: 28.18,
                    url: '/uploads/white_8b3aabe189.webp',
                    previewUrl: null,
                    provider: 'local',
                    provider_metadata: null,
                    createdAt: '2024-09-19T02:42:30.610Z',
                    updatedAt: '2024-09-24T08:37:10.636Z',
                  },
                },
              },
              role: {
                data: {
                  id: '8',
                  attributes: {
                    name: 'Normal User',
                    description:
                      'Default role given to authenticated user with role normal user.',
                    type: 'normal_user',
                    createdAt: '2024-09-19T02:36:43.012Z',
                    updatedAt: '2024-09-19T02:36:43.012Z',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: '8',
      attributes: {
        createdAt: '2024-09-20T03:02:42.033Z',
        updatedAt: '2024-09-20T03:02:43.413Z',
        publishedAt: '2024-09-20T03:02:43.412Z',
        users_permissions_user: {
          data: {
            id: '7',
            attributes: {
              username: 'Jessica Jane',
              email: 'jessicajane@gmail.com.vn',
              provider: 'local',
              confirmed: false,
              blocked: false,
              description:
                "Hi, I'm Jessica Jane. Lorem Ipsum is simply dummy text of the printing and typesetting for it.",
              rating: 4,
              tasks: 23,
              reviews: 123,
              createdAt: '2024-09-19T02:43:11.055Z',
              updatedAt: '2024-09-19T02:43:11.055Z',
              avatar: {
                data: {
                  id: '7',
                  attributes: {
                    name: 'jane.webp',
                    alternativeText: null,
                    caption: null,
                    width: 305,
                    height: 305,
                    formats: {
                      thumbnail: {
                        name: 'thumbnail_jane.webp',
                        hash: 'thumbnail_jane_bf4e84b9e6',
                        ext: '.webp',
                        mime: 'image/webp',
                        path: null,
                        width: 156,
                        height: 156,
                        size: 7.05,
                        sizeInBytes: 7054,
                        url: '/uploads/thumbnail_jane_bf4e84b9e6.webp',
                      },
                    },
                    hash: 'jane_bf4e84b9e6',
                    ext: '.webp',
                    mime: 'image/webp',
                    size: 26.74,
                    url: '/uploads/jane_bf4e84b9e6.webp',
                    previewUrl: null,
                    provider: 'local',
                    provider_metadata: null,
                    createdAt: '2024-09-19T02:42:30.582Z',
                    updatedAt: '2024-09-24T08:37:10.626Z',
                  },
                },
              },
              role: {
                data: {
                  id: '8',
                  attributes: {
                    name: 'Normal User',
                    description:
                      'Default role given to authenticated user with role normal user.',
                    type: 'normal_user',
                    createdAt: '2024-09-19T02:36:43.012Z',
                    updatedAt: '2024-09-19T02:36:43.012Z',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: '9',
      attributes: {
        createdAt: '2024-09-20T03:02:47.914Z',
        updatedAt: '2024-09-20T03:02:48.891Z',
        publishedAt: '2024-09-20T03:02:48.890Z',
        users_permissions_user: {
          data: {
            id: '10',
            attributes: {
              username: 'John Smith',
              email: 'john_smith@asnet.com.vn',
              provider: 'local',
              confirmed: false,
              blocked: false,
              description: "I'm John Smith from VHA with love.",
              rating: 3,
              tasks: 12,
              reviews: 333,
              createdAt: '2024-09-19T02:46:07.578Z',
              updatedAt: '2024-09-19T02:46:07.578Z',
              avatar: {
                data: {
                  id: '9',
                  attributes: {
                    name: 'alex.webp',
                    alternativeText: null,
                    caption: null,
                    width: 305,
                    height: 305,
                    formats: {
                      thumbnail: {
                        name: 'thumbnail_alex.webp',
                        hash: 'thumbnail_alex_45859439cd',
                        ext: '.webp',
                        mime: 'image/webp',
                        path: null,
                        width: 156,
                        height: 156,
                        size: 7.17,
                        sizeInBytes: 7170,
                        url: '/uploads/thumbnail_alex_45859439cd.webp',
                      },
                    },
                    hash: 'alex_45859439cd',
                    ext: '.webp',
                    mime: 'image/webp',
                    size: 26.72,
                    url: '/uploads/alex_45859439cd.webp',
                    previewUrl: null,
                    provider: 'local',
                    provider_metadata: null,
                    createdAt: '2024-09-19T02:42:30.625Z',
                    updatedAt: '2024-09-24T08:37:10.646Z',
                  },
                },
              },
              role: {
                data: {
                  id: '8',
                  attributes: {
                    name: 'Normal User',
                    description:
                      'Default role given to authenticated user with role normal user.',
                    type: 'normal_user',
                    createdAt: '2024-09-19T02:36:43.012Z',
                    updatedAt: '2024-09-19T02:36:43.012Z',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: '10',
      attributes: {
        createdAt: '2024-09-20T03:03:09.116Z',
        updatedAt: '2024-09-20T03:03:09.580Z',
        publishedAt: '2024-09-20T03:03:09.579Z',
        users_permissions_user: {
          data: {
            id: '6',
            attributes: {
              username: 'ThangHq',
              email: 'thang.hoquang@asnet.com.vn',
              provider: 'local',
              confirmed: false,
              blocked: false,
              description:
                "Hi, I'm Thang Ho Quang. I'm a software developer in AgilityIO. I'm so happy my job.",
              rating: 5,
              tasks: 40,
              reviews: 600,
              createdAt: '2024-09-10T07:07:42.060Z',
              updatedAt: '2024-09-19T02:41:00.646Z',
              avatar: {
                data: {
                  id: '6',
                  attributes: {
                    name: 'avt_hue.jpg',
                    alternativeText: null,
                    caption: null,
                    width: 960,
                    height: 960,
                    formats: {
                      thumbnail: {
                        name: 'thumbnail_avt_hue.jpg',
                        hash: 'thumbnail_avt_hue_335d006883',
                        ext: '.jpg',
                        mime: 'image/jpeg',
                        path: null,
                        width: 156,
                        height: 156,
                        size: 10.36,
                        sizeInBytes: 10359,
                        url: '/uploads/thumbnail_avt_hue_335d006883.jpg',
                      },
                      small: {
                        name: 'small_avt_hue.jpg',
                        hash: 'small_avt_hue_335d006883',
                        ext: '.jpg',
                        mime: 'image/jpeg',
                        path: null,
                        width: 500,
                        height: 500,
                        size: 102.44,
                        sizeInBytes: 102442,
                        url: '/uploads/small_avt_hue_335d006883.jpg',
                      },
                      medium: {
                        name: 'medium_avt_hue.jpg',
                        hash: 'medium_avt_hue_335d006883',
                        ext: '.jpg',
                        mime: 'image/jpeg',
                        path: null,
                        width: 750,
                        height: 750,
                        size: 221.35,
                        sizeInBytes: 221353,
                        url: '/uploads/medium_avt_hue_335d006883.jpg',
                      },
                    },
                    hash: 'avt_hue_335d006883',
                    ext: '.jpg',
                    mime: 'image/jpeg',
                    size: 334.62,
                    url: '/uploads/avt_hue_335d006883.jpg',
                    previewUrl: null,
                    provider: 'local',
                    provider_metadata: null,
                    createdAt: '2024-09-10T07:06:20.012Z',
                    updatedAt: '2024-09-24T08:37:10.613Z',
                  },
                },
              },
              role: {
                data: {
                  id: '6',
                  attributes: {
                    name: 'Admin',
                    description: 'Default role given to authenticated admin.',
                    type: 'authenticated',
                    createdAt: '2024-09-10T03:01:06.879Z',
                    updatedAt: '2024-09-26T09:55:03.464Z',
                  },
                },
              },
            },
          },
        },
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 5,
    },
  },
};

export const USER_OPTIONS: UserModel[] = [
  {
    username: 'Alex Stanton',
    email: 'alexstanton@gmail.com',
    description:
      "Hi, I'm Alex Stanton. Happy for all problem happen with me. Let's smile.",
    rating: 5,
    tasks: 22,
    reviews: 321,
    specialtyId: {
      data: {
        id: '1',
        attributes: {
          name: 'Instrumentation',
        },
      },
    },
  },
  {
    username: 'Anna White',
    email: 'anna_white@asnet.com.vn',
    description: '',
    rating: 5,
    tasks: 40,
    reviews: 600,
    specialtyId: {
      data: {
        id: '2',
        attributes: {
          name: 'Laboratory Chemist',
        },
      },
    },
  },

  {
    username: 'Jessica Jane',
    email: 'jessicajane@gmail.com.vn',
    description:
      "Hi, I'm Jessica Jane. Lorem Ipsum is simply dummy text of the printing and typesetting for it.",
    rating: 4,
    tasks: 23,
    reviews: 123,
    specialtyId: {
      data: {
        id: '2',
        attributes: {
          name: 'Laboratory Chemist',
        },
      },
    },
  },
];

export const MOCK_USERS_LOGGED: UserLogged[] = [
  {
    id: '30',
    username: 'John Smith',
    email: 'john_smith@asnet.com.vn',
    description: "I'm John Smith from VHA with love.",
    role: { name: ROLE.NORMAL_USER },
    rating: 3,
    tasks: 12,
    reviews: 333,
  },
  {
    id: '20',
    username: 'Jessica Jane',
    email: 'jessica_jane@asnet.com.vn',
    role: { name: ROLE.ADMIN },
    description: "I'm Jessica Jane', from VHA with love.",
    rating: 5,
    tasks: 30,
    reviews: 1442,
  },
];

export const MOCK_USER_ROLE: RolePermission[] = [
  {
    id: 1,
    name: ROLE.NORMAL_USER,
  },
  {
    id: 2,
    name: ROLE.ADMIN,
  },
];

export const MOCK_USER_SESSION: UserSession = {
  id: MOCK_USERS_LOGGED[0].id,
  username: MOCK_USERS_LOGGED[0].username,
  email: MOCK_USERS_LOGGED[0].email,
  token: 'access-token',
  role: '',
  avatar: AVATAR_THUMBNAIL,
  remember: true,
};
