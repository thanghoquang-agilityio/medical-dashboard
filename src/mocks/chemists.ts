import { APIResponse, ChemistModel, SpecialtyResponse } from '@/types';

export const MOCK_CHEMISTS_LIST: Array<APIResponse<ChemistModel>> = [
  {
    id: '6',
    attributes: {
      users_permissions_user: {
        data: {
          id: '8',
          attributes: {
            username: 'Alex Stanton',
            email: 'alexstanton@gmail.com',
            description:
              "Hi, I'm Alex Stanton. Happy for all problem happen with me. Let's smile.",
            rating: 5,
            tasks: 22,
            reviews: 321,
            avatar: {
              data: {
                id: '10',
                attributes: {
                  id: '10',
                  name: 'kyle.webp',
                  hash: 'kyle_554a95ac44',
                  url: '/uploads/kyle_554a95ac44.webp',
                },
              },
            },
            specialtyId: {
              data: {
                id: '8',
                attributes: {
                  name: 'Laboratory Chemist',
                },
              },
            },
          },
        },
      },
    },
  },
  {
    id: '7',
    attributes: {
      users_permissions_user: {
        data: {
          id: '9',
          attributes: {
            username: 'Anna White',
            email: 'anna_white@asnet.com.vn',
            description: '',
            rating: 5,
            tasks: 40,
            reviews: 600,
            avatar: {
              data: {
                id: '8',
                attributes: {
                  id: '20',
                  name: 'white.webp',
                  hash: 'white_8b3aabe189',
                  url: '/uploads/white_8b3aabe189.webp',
                },
              },
            },

            specialtyId: {
              data: {
                id: '10',
                attributes: {
                  name: 'Power Plant Chemist',
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
      users_permissions_user: {
        data: {
          id: '7',
          attributes: {
            username: 'Jessica Jane',
            email: 'jessicajane@gmail.com.vn',
            description:
              "Hi, I'm Jessica Jane. Lorem Ipsum is simply dummy text of the printing and typesetting for it.",
            rating: 4,
            tasks: 23,
            reviews: 123,
            avatar: {
              data: {
                id: '7',
                attributes: {
                  id: '19',
                  name: 'jane.webp',
                  hash: 'jane_bf4e84b9e6',
                  url: '/uploads/jane_bf4e84b9e6.webp',
                },
              },
            },

            specialtyId: {
              data: {
                id: '9',
                attributes: {
                  name: 'Instrumentation',
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
      users_permissions_user: {
        data: {
          id: '10',
          attributes: {
            username: 'John Smith',
            email: 'john_smith@asnet.com.vn',
            description: "I'm John Smith from VHA with love.",
            rating: 3,
            tasks: 12,
            reviews: 333,
            avatar: {
              data: {
                id: '9',
                attributes: {
                  id: '18',
                  name: 'alex.webp',
                  hash: 'alex_45859439cd',
                  url: '/uploads/alex_45859439cd.webp',
                },
              },
            },
            specialtyId: {
              data: {
                id: '7',
                attributes: {
                  name: 'QC Chemist',
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
      users_permissions_user: {
        data: {
          id: '6',
          attributes: {
            username: 'ThangHq',
            email: 'thang.hoquang@asnet.com.vn',
            description:
              "Hi, I'm Thang Ho Quang. I'm a software developer in AgilityIO. I'm so happy my job.",
            rating: 5,
            tasks: 40,
            reviews: 600,
            avatar: {
              data: {
                id: '6',
                attributes: {
                  id: '17',
                  name: 'avt_hue.jpg',
                  hash: 'avt_hue_335d006883',
                  url: '/uploads/avt_hue_335d006883.jpg',
                },
              },
            },
            specialtyId: {
              data: {
                id: '6',
                attributes: {
                  name: 'Organic Chemist',
                },
              },
            },
          },
        },
      },
    },
  },
];

export const MOCK_SPECIALTIES: SpecialtyResponse[] = [
  {
    id: '1',
    attributes: {
      name: 'Instrumentation',
      type: 1,
    },
  },
  {
    id: '2',
    attributes: {
      name: 'Laboratory Chemist',
      type: 2,
    },
  },
  {
    id: '3',
    attributes: {
      name: 'Organic Chemist',
      type: 3,
    },
  },
  {
    id: '4',
    attributes: {
      name: 'Power Plant Chemist',
      type: 4,
    },
  },
  {
    id: '5',
    attributes: {
      name: 'QC Chemist',
      type: 5,
    },
  },
];
