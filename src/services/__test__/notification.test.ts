// import { NotificationsDataResponse } from "@/types";
import { ApiClient, apiClient } from '../api';
import { MOCK_NOTIFICATION_LIST } from '@/mocks';
import {
  addNotification,
  deleteNotification,
  getNotifications,
  updateNotification,
} from '../notification';
import { API_ENDPOINT, EXCEPTION_ERROR_MESSAGE } from '@/constants';

jest.mock('next/cache');
describe('Notification service test cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockGet = jest.fn();
  const mockPost = jest.fn();
  const mockPut = jest.fn();
  const mockDelete = jest.fn();
  it('should return the list of notifications', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      get: mockGet.mockResolvedValueOnce({
        data: MOCK_NOTIFICATION_LIST,
        meta: {},
        error: null,
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await getNotifications({});

    expect(result).toEqual({
      notifications: MOCK_NOTIFICATION_LIST,
      error: null,
    });

    expect(mockGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.NOTIFICATIONS}?`,
      expect.anything(),
    );
  });

  it('should return error message when there are errors during getting notification list', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      get: mockGet.mockResolvedValueOnce({
        data: [],
        meta: {},
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await getNotifications({});

    expect(result).toEqual({
      notifications: [],
      error: 'Something went wrong',
    });

    expect(mockGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.NOTIFICATIONS}?`,
      expect.anything(),
    );
  });

  it('should handle error exception when getting notification list', async () => {
    const api = jest.spyOn(apiClient, 'apiClientSession');

    api.mockResolvedValueOnce({
      get: mockGet.mockRejectedValueOnce(new Error('Mock error exception')),
    } as Partial<ApiClient> as ApiClient);

    let result = await getNotifications({});

    expect(result).toEqual({
      notifications: [],
      error: 'Mock error exception',
    });

    api.mockResolvedValueOnce({
      get: mockGet.mockRejectedValueOnce({}),
    } as Partial<ApiClient> as ApiClient);

    result = await getNotifications({});

    expect(result).toEqual({
      notifications: [],
      error: EXCEPTION_ERROR_MESSAGE.GET('notifications'),
    });
  });

  it('should return the notification when adding', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      post: mockPost.mockResolvedValueOnce({
        data: MOCK_NOTIFICATION_LIST[0],
        error: null,
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await addNotification({
      ...MOCK_NOTIFICATION_LIST[0].attributes,
      senderId: '1',
    });

    expect(result).toEqual({
      notification: MOCK_NOTIFICATION_LIST[0],
      error: null,
    });

    expect(mockPost).toHaveBeenCalledWith(`${API_ENDPOINT.NOTIFICATIONS}`, {
      body: {
        data: {
          ...MOCK_NOTIFICATION_LIST[0].attributes,
          senderId: '1',
        },
      },
    });
  });

  it('should return error message when there are errors during adding notification', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      post: mockPost.mockResolvedValueOnce({
        data: null,
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await addNotification({
      ...MOCK_NOTIFICATION_LIST[0].attributes,
      senderId: '1',
    });

    expect(result).toEqual({
      notification: null,
      error: 'Something went wrong',
    });

    expect(mockPost).toHaveBeenCalledWith(`${API_ENDPOINT.NOTIFICATIONS}`, {
      body: {
        data: {
          ...MOCK_NOTIFICATION_LIST[0].attributes,
          senderId: '1',
        },
      },
    });
  });

  it('should handle error exception when adding notification list', async () => {
    const api = jest.spyOn(apiClient, 'apiClientSession');

    api.mockResolvedValueOnce({
      post: mockPost.mockRejectedValueOnce(new Error('Mock error exception')),
    } as Partial<ApiClient> as ApiClient);

    let result = await addNotification({
      ...MOCK_NOTIFICATION_LIST[0].attributes,
      senderId: '1',
    });

    expect(result).toEqual({
      notification: null,
      error: 'Mock error exception',
    });

    api.mockResolvedValueOnce({
      post: mockPost.mockRejectedValueOnce({}),
    } as Partial<ApiClient> as ApiClient);

    result = await addNotification({
      ...MOCK_NOTIFICATION_LIST[0].attributes,
      senderId: '1',
    });

    expect(result).toEqual({
      notification: null,
      error: EXCEPTION_ERROR_MESSAGE.ADD('notification'),
    });

    expect(mockPost).toHaveBeenCalledWith(`${API_ENDPOINT.NOTIFICATIONS}`, {
      body: {
        data: {
          ...MOCK_NOTIFICATION_LIST[0].attributes,
          senderId: '1',
        },
      },
    });
  });

  it('should return the notification when updating', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockResolvedValueOnce({
        data: MOCK_NOTIFICATION_LIST[0],
        error: null,
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await updateNotification('1', {
      ...MOCK_NOTIFICATION_LIST[0].attributes,
      senderId: '1',
    });

    expect(result).toEqual({
      notification: MOCK_NOTIFICATION_LIST[0],
      error: null,
    });

    expect(mockPut).toHaveBeenCalledWith(`${API_ENDPOINT.NOTIFICATIONS}/1`, {
      body: {
        data: {
          ...MOCK_NOTIFICATION_LIST[0].attributes,
          senderId: '1',
        },
      },
    });
  });

  it('should return error message when there are errors during updating notification', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: mockPut.mockResolvedValueOnce({
        data: null,
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await updateNotification('1', {
      ...MOCK_NOTIFICATION_LIST[0].attributes,
      senderId: '1',
    });

    expect(result).toEqual({
      notification: null,
      error: 'Something went wrong',
    });

    expect(mockPut).toHaveBeenCalledWith(`${API_ENDPOINT.NOTIFICATIONS}/1`, {
      body: {
        data: {
          ...MOCK_NOTIFICATION_LIST[0].attributes,
          senderId: '1',
        },
      },
    });
  });

  it('should handle error exception when updating notification list', async () => {
    const api = jest.spyOn(apiClient, 'apiClientSession');

    api.mockResolvedValueOnce({
      put: mockPut.mockRejectedValueOnce(new Error('Mock error exception')),
    } as Partial<ApiClient> as ApiClient);

    let result = await updateNotification('1', {
      ...MOCK_NOTIFICATION_LIST[0].attributes,
      senderId: '1',
    });

    expect(result).toEqual({
      notification: null,
      error: 'Mock error exception',
    });

    api.mockResolvedValueOnce({
      put: mockPut.mockRejectedValueOnce({}),
    } as Partial<ApiClient> as ApiClient);

    result = await updateNotification('1', {
      ...MOCK_NOTIFICATION_LIST[0].attributes,
      senderId: '1',
    });

    expect(result).toEqual({
      notification: null,
      error: EXCEPTION_ERROR_MESSAGE.UPDATE('notification'),
    });

    expect(mockPut).toHaveBeenCalledWith(`${API_ENDPOINT.NOTIFICATIONS}/1`, {
      body: {
        data: {
          ...MOCK_NOTIFICATION_LIST[0].attributes,
          senderId: '1',
        },
      },
    });
  });

  it('should return the notification when deleting', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      delete: mockDelete.mockResolvedValueOnce({
        data: MOCK_NOTIFICATION_LIST[0],
        error: null,
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await deleteNotification('1');

    expect(result).toEqual({
      notification: MOCK_NOTIFICATION_LIST[0],
      error: null,
    });

    expect(mockDelete).toHaveBeenCalledWith(`${API_ENDPOINT.NOTIFICATIONS}/1`);
  });

  it('should return error message when there are errors during deleting notification', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      delete: mockDelete.mockResolvedValueOnce({
        data: null,
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await deleteNotification('1');

    expect(result).toEqual({
      notification: null,
      error: 'Something went wrong',
    });

    expect(mockDelete).toHaveBeenCalledWith(`${API_ENDPOINT.NOTIFICATIONS}/1`);
  });

  it('should handle error exception when deleting notification', async () => {
    const api = jest.spyOn(apiClient, 'apiClientSession');

    api.mockResolvedValueOnce({
      delete: mockDelete.mockRejectedValueOnce(
        new Error('Mock error exception'),
      ),
    } as Partial<ApiClient> as ApiClient);

    let result = await deleteNotification('1');

    expect(result).toEqual({
      notification: null,
      error: 'Mock error exception',
    });

    api.mockResolvedValueOnce({
      delete: jest.fn().mockRejectedValueOnce({}),
    } as Partial<ApiClient> as ApiClient);

    result = await deleteNotification('1');

    expect(result).toEqual({
      notification: null,
      error: EXCEPTION_ERROR_MESSAGE.DELETE('notification'),
    });

    expect(mockDelete).toHaveBeenCalledWith(`${API_ENDPOINT.NOTIFICATIONS}/1`);
  });
});
