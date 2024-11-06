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
describe('User services test cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const apiGet = jest.spyOn(apiClient, 'get');
  const apiPut = jest.spyOn(apiClient, 'put');

  const mockGet = jest.fn();
  const mockPost = jest.fn();
  const mockPut = jest.fn();

  it('should return the user information', async () => {
    apiGet.mockResolvedValueOnce({ ...MOCK_USERS_LOGGED[0] });

    const result = await getUserLogged('');

    expect(result).toEqual({ user: MOCK_USERS_LOGGED[0], error: null });

    expect(apiGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}/me?populate=*`,
      expect.anything(),
    );
  });

  it('should return error message if there are errors during getting logged user information', async () => {
    apiGet.mockResolvedValueOnce({ error: 'Something went wrong' });

    const result = await getUserLogged('');

    expect(result).toEqual({ user: {}, error: 'Something went wrong' });

    expect(apiGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}/me?populate=*`,
      expect.anything(),
    );
  });

  it('should handle error exception during getting logged user information', async () => {
    apiGet.mockRejectedValueOnce(new Error('Mock error exception'));

    let result = await getUserLogged('');

    expect(result).toEqual({ user: null, error: 'Mock error exception' });

    apiGet.mockRejectedValueOnce({});

    result = await getUserLogged('');

    expect(result).toEqual({
      user: null,
      error: EXCEPTION_ERROR_MESSAGE.GET('user logged'),
    });

    expect(apiGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}/me?populate=*`,
      expect.anything(),
    );
  });

  it('should return the list of user information', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      get: mockGet.mockResolvedValueOnce(MOCK_USERS_LOGGED),
    } as Partial<ApiClient> as ApiClient);

    const result = await getUsers();

    expect(result).toEqual({
      users: MOCK_USERS_LOGGED,
      error: null,
    });

    expect(mockGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}?filters[publishedAt][$notNull]=true`,
      expect.anything(),
    );
  });

  it('should return error message if there are errors during getting all users information', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      get: mockGet.mockResolvedValueOnce({
        ...[],
        error: 'Something went wrong',
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await getUsers();

    expect(result).toEqual({
      users: [],
      error: 'Something went wrong',
    });

    expect(mockGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}?filters[publishedAt][$notNull]=true`,
      expect.anything(),
    );
  });

  it('should handle error exception during getting all users information', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      get: mockGet.mockRejectedValueOnce(new Error('Mock error exception')),
    } as Partial<ApiClient> as ApiClient);

    let result = await getUsers();

    expect(result).toEqual({
      users: [],
      error: 'Mock error exception',
    });

    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      get: mockGet.mockRejectedValueOnce({}),
    } as Partial<ApiClient> as ApiClient);

    result = await getUsers();

    expect(result).toEqual({
      users: [],
      error: EXCEPTION_ERROR_MESSAGE.GET('users'),
    });

    expect(mockGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}?filters[publishedAt][$notNull]=true`,
      expect.anything(),
    );
  });

  it('should return the list of user role', async () => {
    apiGet.mockResolvedValueOnce({
      roles: MOCK_USER_ROLE,
      error: null,
    });

    const result = await getUserRoles();

    expect(result).toEqual({
      roles: MOCK_USER_ROLE,
      error: null,
    });

    expect(apiGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.PERMISSIONS}/roles`,
      expect.anything(),
    );
  });

  it('should return error message if there are errors during getting user role', async () => {
    apiGet.mockResolvedValueOnce({
      roles: [],
      error: 'Something went wrong',
    });

    const result = await getUserRoles();

    expect(result).toEqual({
      roles: [],
      error: 'Something went wrong',
    });

    expect(apiGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.PERMISSIONS}/roles`,
      expect.anything(),
    );
  });

  it('should handle error exception during getting user role', async () => {
    apiGet.mockRejectedValueOnce(new Error('Mock error exception'));

    let result = await getUserRoles();

    expect(result).toEqual({
      roles: [],
      error: 'Mock error exception',
    });

    apiGet.mockRejectedValueOnce({});

    result = await getUserRoles();

    expect(result).toEqual({
      roles: [],
      error: EXCEPTION_ERROR_MESSAGE.GET('user roles'),
    });

    expect(apiGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.PERMISSIONS}/roles`,
      expect.anything(),
    );
  });

  it('should return user information when adding user', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      post: mockPost.mockResolvedValueOnce({
        ...USER_OPTIONS[0],
        error: null,
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await addUser(MOCK_USER_PAYLOAD);

    expect(result).toEqual({
      user: USER_OPTIONS[0],
      error: null,
    });

    expect(mockPost).toHaveBeenCalledWith(`${API_ENDPOINT.USERS}`, {
      body: MOCK_USER_PAYLOAD,
    });
  });

  it('should return error message if there are errors during adding user', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      post: mockPost.mockResolvedValueOnce({
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await addUser(MOCK_USER_PAYLOAD);

    expect(result).toEqual({
      user: null,
      error: 'Something went wrong',
    });

    expect(mockPost).toHaveBeenCalledWith(`${API_ENDPOINT.USERS}`, {
      body: MOCK_USER_PAYLOAD,
    });
  });

  it('should handle error exception during adding user', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      post: mockPost.mockRejectedValueOnce(new Error('Mock error exception')),
    } as Partial<ApiClient> as ApiClient);

    let result = await addUser(MOCK_USER_PAYLOAD);

    expect(result).toEqual({
      user: null,
      error: 'Mock error exception',
    });

    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      post: mockPost.mockRejectedValueOnce({}),
    } as Partial<ApiClient> as ApiClient);

    result = await addUser(MOCK_USER_PAYLOAD);

    expect(result).toEqual({
      user: null,
      error: EXCEPTION_ERROR_MESSAGE.ADD('user'),
    });

    expect(mockPost).toHaveBeenCalledWith(`${API_ENDPOINT.USERS}`, {
      body: MOCK_USER_PAYLOAD,
    });
  });

  it('should return user information when updating user', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockResolvedValueOnce({
        ...USER_OPTIONS[0],
        error: null,
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await updateUser(USER_OPTIONS[0].id!, MOCK_USER_PAYLOAD);

    expect(result).toEqual({
      user: USER_OPTIONS[0],
      error: null,
    });

    expect(mockPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}/${USER_OPTIONS[0].id}`,
      {
        body: MOCK_USER_PAYLOAD,
      },
    );
  });

  it('should return error message if there are errors during updating user', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockResolvedValueOnce({
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await updateUser(USER_OPTIONS[0].id!, MOCK_USER_PAYLOAD);

    expect(result).toEqual({
      user: null,
      error: 'Something went wrong',
    });

    expect(mockPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}/${USER_OPTIONS[0].id}`,
      {
        body: MOCK_USER_PAYLOAD,
      },
    );
  });

  it('should handle error exception during updating user', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockRejectedValueOnce(new Error('Mock error exception')),
    } as Partial<ApiClient> as ApiClient);

    let result = await updateUser(USER_OPTIONS[0].id!, MOCK_USER_PAYLOAD);

    expect(result).toEqual({
      user: null,
      error: 'Mock error exception',
    });

    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockRejectedValueOnce({}),
    } as Partial<ApiClient> as ApiClient);

    result = await updateUser(USER_OPTIONS[0].id!, MOCK_USER_PAYLOAD);

    expect(result).toEqual({
      user: null,
      error: EXCEPTION_ERROR_MESSAGE.UPDATE('user'),
    });

    expect(mockPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}/${USER_OPTIONS[0].id}`,
      {
        body: MOCK_USER_PAYLOAD,
      },
    );
  });

  it('should return user information when updating publish user', async () => {
    apiPut.mockResolvedValueOnce({
      ...USER_OPTIONS[0],
      error: null,
    });

    const result = await updatePublishUser(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      user: USER_OPTIONS[0],
      error: null,
    });

    expect(apiPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}/${USER_OPTIONS[0].id}`,
      expect.anything(),
    );
  });

  it('should return error message if there are errors during updating publish user', async () => {
    apiPut.mockResolvedValueOnce({
      error: JSON.stringify({
        error: {
          message: 'Something went wrong',
        },
      }),
    });

    const result = await updatePublishUser(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      user: null,
      error: 'Something went wrong',
    });

    expect(apiPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}/${USER_OPTIONS[0].id}`,
      expect.anything(),
    );
  });

  it('should handle error exception during updating publish user', async () => {
    apiPut.mockRejectedValueOnce(new Error('Mock error exception'));

    let result = await updatePublishUser(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      user: null,
      error: 'Mock error exception',
    });

    apiPut.mockRejectedValueOnce({});

    result = await updatePublishUser(USER_OPTIONS[0].id!);

    expect(result).toEqual({
      user: null,
      error: EXCEPTION_ERROR_MESSAGE.UPDATE('user'),
    });

    expect(apiPut).toHaveBeenCalledWith(
      `${API_ENDPOINT.USERS}/${USER_OPTIONS[0].id}`,
      expect.anything(),
    );
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
