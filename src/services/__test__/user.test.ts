import {
  MOCK_USER_PAYLOAD,
  MOCK_USER_ROLE,
  MOCK_USERS_LOGGED,
  USER_OPTIONS,
} from '@/mocks';
import { ApiClient, apiClient } from '../api';
import {
  addUser,
  getUserLogged,
  getUserRoles,
  getUsers,
  updatePublishUser,
  updateUnpublishAppointment,
  updateUnpublishChemist,
  updateUnpublishNotification,
  updateUnpublishUser,
  updateUser,
} from '../user';
import { API_ENDPOINT, EXCEPTION_ERROR_MESSAGE } from '@/constants';

jest.mock('next/cache');
jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    auth: jest.fn(),
  }),
}));

describe('User services test cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockPut = jest.fn();

  const mockFetch = jest.fn();

  global.fetch = mockFetch;

  it('should return the user information', async () => {
    const response = { ...MOCK_USERS_LOGGED[0], error: null };

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(response),
    });

    const result = await getUserLogged('');

    expect(result).toStrictEqual({ error: null, user: MOCK_USERS_LOGGED[0] });
  });

  it('should return error message if there are errors during getting logged user information', async () => {
    const response = { error: 'mock' };

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(response),
    });

    const result = await getUserLogged('');

    expect(result).toEqual({ user: {}, error: 'mock' });
  });

  it('should handle error exception during getting logged user information', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('Mock error exception')),
    });

    let result = await getUserLogged('');

    expect(result).toEqual({ user: null, error: 'Mock error exception' });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(''),
    });

    result = await getUserLogged('');

    expect(result).toEqual({
      user: null,
      error: EXCEPTION_ERROR_MESSAGE.GET('user logged'),
    });
  });

  it('should return the list of user information', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(MOCK_USERS_LOGGED),
    });

    const result = await getUsers();

    expect(result).toEqual({
      users: MOCK_USERS_LOGGED,
      error: null,
    });
  });

  it('should return error message if there are errors during getting all users information', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          ...[],
          error: 'Something went wrong',
        }),
    });

    const result = await getUsers();

    expect(result).toEqual({
      users: [],
      error: 'Something went wrong',
    });
  });

  it('should handle error exception during getting all users information', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('Mock error exception')),
    });

    let result = await getUsers();

    expect(result).toEqual({
      users: [],
      error: 'Mock error exception',
    });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject({}),
    });

    result = await getUsers();

    expect(result).toEqual({
      users: [],
      error: EXCEPTION_ERROR_MESSAGE.GET('users'),
    });
  });

  it('should return the list of user role', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          roles: MOCK_USER_ROLE,
          error: null,
        }),
    });

    const result = await getUserRoles();

    expect(result).toEqual({
      roles: MOCK_USER_ROLE,
      error: null,
    });
  });

  it('should return error message if there are errors during getting user role', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          roles: [],
          error: 'Something went wrong',
        }),
    });

    const result = await getUserRoles();

    expect(result).toEqual({
      roles: [],
      error: 'Something went wrong',
    });
  });

  it('should handle error exception during getting user role', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('Mock error exception')),
    });

    let result = await getUserRoles();

    expect(result).toEqual({
      roles: [],
      error: 'Mock error exception',
    });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject({}),
    });

    result = await getUserRoles();

    expect(result).toEqual({
      roles: [],
      error: EXCEPTION_ERROR_MESSAGE.GET('user roles'),
    });
  });

  it('should return user information when adding user', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          ...USER_OPTIONS[0],
          error: null,
        }),
    });

    const result = await addUser(MOCK_USER_PAYLOAD);

    expect(result).toEqual({
      user: USER_OPTIONS[0],
      error: null,
    });
  });

  it('should return error message if there are errors during adding user', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          error: JSON.stringify({
            error: {
              message: 'Something went wrong',
            },
          }),
        }),
    });

    const result = await addUser(MOCK_USER_PAYLOAD);

    expect(result).toEqual({
      user: null,
      error: 'Something went wrong',
    });
  });

  it('should handle error exception during adding user', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('Mock error exception')),
    });

    let result = await addUser(MOCK_USER_PAYLOAD);

    expect(result).toEqual({
      user: null,
      error: 'Mock error exception',
    });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject({}),
    });

    result = await addUser(MOCK_USER_PAYLOAD);

    expect(result).toEqual({
      user: null,
      error: EXCEPTION_ERROR_MESSAGE.ADD('user'),
    });
  });

  it('should return user information when updating user', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          ...USER_OPTIONS[0],
          error: null,
        }),
    });

    const result = await updateUser(USER_OPTIONS[0].id!, MOCK_USER_PAYLOAD);

    expect(result).toEqual({
      user: USER_OPTIONS[0],
      error: null,
    });
  });

  it('should return error message if there are errors during updating user', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          error: JSON.stringify({
            error: {
              message: 'Something went wrong',
            },
          }),
        }),
    });

    const result = await updateUser(USER_OPTIONS[0].id!, MOCK_USER_PAYLOAD);

    expect(result).toEqual({
      user: null,
      error: 'Something went wrong',
    });
  });

  it('should handle error exception during updating user', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('Mock error exception')),
    });

    let result = await updateUser(USER_OPTIONS[0].id!, MOCK_USER_PAYLOAD);

    expect(result).toEqual({
      user: null,
      error: 'Mock error exception',
    });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject({}),
    });

    result = await updateUser(USER_OPTIONS[0].id!, MOCK_USER_PAYLOAD);

    expect(result).toEqual({
      user: null,
      error: EXCEPTION_ERROR_MESSAGE.UPDATE('user'),
    });
  });

  it('should return user information when updating publish user', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          ...USER_OPTIONS[0],
          error: null,
        }),
    });

    const result = await updatePublishUser(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      user: USER_OPTIONS[0],
      error: null,
    });
  });

  it('should return error message if there are errors during updating publish user', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          error: JSON.stringify({
            error: {
              message: 'Something went wrong',
            },
          }),
        }),
    });

    const result = await updatePublishUser(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      user: null,
      error: 'Something went wrong',
    });
  });

  it('should handle error exception during updating publish user', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('Mock error exception')),
    });

    let result = await updatePublishUser(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      user: null,
      error: 'Mock error exception',
    });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject({}),
    });

    result = await updatePublishUser(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      user: null,
      error: EXCEPTION_ERROR_MESSAGE.UPDATE('user'),
    });
  });

  it('should return user information when updating unpublish user', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockResolvedValueOnce({
        ...USER_OPTIONS[0],
        error: null,
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await updateUnpublishUser(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      user: USER_OPTIONS[0],
      error: null,
    });

    expect(mockPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}/${USER_OPTIONS[0].id}`,
      expect.anything(),
    );
  });

  it('should return error message if there are errors during updating unpublish user', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockResolvedValueOnce({
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await updateUnpublishUser(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      user: null,
      error: 'Something went wrong',
    });

    expect(mockPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}/${USER_OPTIONS[0].id}`,
      expect.anything(),
    );
  });

  it('should handle error exception during updating unpublish user', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockRejectedValueOnce(new Error('Mock error exception')),
    } as Partial<ApiClient> as ApiClient);

    let result = await updateUnpublishUser(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      user: null,
      error: 'Mock error exception',
    });

    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockRejectedValueOnce({}),
    } as Partial<ApiClient> as ApiClient);

    result = await updateUnpublishUser(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      user: null,
      error: EXCEPTION_ERROR_MESSAGE.UPDATE('user'),
    });

    expect(mockPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}/${USER_OPTIONS[0].id}`,
      expect.anything(),
    );
  });

  it('should return none error when update unpublish chemist successfully', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockResolvedValueOnce({
        error: null,
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await updateUnpublishChemist(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      error: null,
    });

    expect(mockPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.CHEMISTS}/unpublish/${USER_OPTIONS[0].id}`,
    );
  });

  it('should return error message if there are errors during updating unpublish chemist', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockResolvedValueOnce({
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await updateUnpublishChemist(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      error: 'Something went wrong',
    });

    expect(mockPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.CHEMISTS}/unpublish/${USER_OPTIONS[0].id}`,
    );
  });

  it('should handle error exception during updating unpublish chemist', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockRejectedValueOnce(new Error('Mock error exception')),
    } as Partial<ApiClient> as ApiClient);

    let result = await updateUnpublishChemist(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      error: 'Mock error exception',
    });

    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockRejectedValueOnce({}),
    } as Partial<ApiClient> as ApiClient);

    result = await updateUnpublishChemist(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      error: EXCEPTION_ERROR_MESSAGE.UPDATE('user'),
    });

    expect(mockPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.CHEMISTS}/unpublish/${USER_OPTIONS[0].id}`,
    );
  });

  it('should return none error when update unpublish notification successfully', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockResolvedValueOnce({
        error: null,
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await updateUnpublishNotification(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      error: null,
    });

    expect(mockPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.NOTIFICATIONS}/unpublish/${USER_OPTIONS[0].id}`,
    );
  });

  it('should return error message if there are errors during updating unpublish notification', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockResolvedValueOnce({
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await updateUnpublishNotification(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      error: 'Something went wrong',
    });

    expect(mockPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.NOTIFICATIONS}/unpublish/${USER_OPTIONS[0].id}`,
    );
  });

  it('should handle error exception during updating unpublish notification', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockRejectedValueOnce(new Error('Mock error exception')),
    } as Partial<ApiClient> as ApiClient);

    let result = await updateUnpublishNotification(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      error: 'Mock error exception',
    });

    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockRejectedValueOnce({}),
    } as Partial<ApiClient> as ApiClient);

    result = await updateUnpublishNotification(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      error: EXCEPTION_ERROR_MESSAGE.UPDATE('user'),
    });

    expect(mockPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.NOTIFICATIONS}/unpublish/${USER_OPTIONS[0].id}`,
    );
  });

  it('should return none error when update unpublish appointment successfully', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockResolvedValueOnce({
        error: null,
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await updateUnpublishAppointment(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      error: null,
    });

    expect(mockPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.APPOINTMENTS}/unpublish/${USER_OPTIONS[0].id}`,
    );
  });

  it('should return error message if there are errors during updating unpublish appointment', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockResolvedValueOnce({
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await updateUnpublishAppointment(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      error: 'Something went wrong',
    });

    expect(mockPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.APPOINTMENTS}/unpublish/${USER_OPTIONS[0].id}`,
    );
  });

  it('should handle error exception during updating unpublish appointment', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockRejectedValueOnce(new Error('Mock error exception')),
    } as Partial<ApiClient> as ApiClient);

    let result = await updateUnpublishAppointment(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      error: 'Mock error exception',
    });

    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockRejectedValueOnce({}),
    } as Partial<ApiClient> as ApiClient);

    result = await updateUnpublishAppointment(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      error: EXCEPTION_ERROR_MESSAGE.UPDATE('user'),
    });

    expect(mockPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.APPOINTMENTS}/unpublish/${USER_OPTIONS[0].id}`,
    );
  });
});
