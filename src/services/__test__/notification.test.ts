// import { NotificationsDataResponse } from "@/types";
import { ApiClient, apiClient } from '../api';
import { MOCK_NOTIFICATION_LIST } from '@/mocks';
import {
  addNotification,
  deleteNotification,
  getNotifications,
  updateNotification,
} from '../notification';

jest.mock('next/cache');
describe('Notification service test cases', () => {
  it('should return the list of notifications', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      get: jest.fn().mockResolvedValueOnce({
        data: MOCK_NOTIFICATION_LIST,
        meta: {},
        error: null,
      }),
    } as unknown as ApiClient);

    const result = await getNotifications({});

    expect(result).toEqual({
      notifications: MOCK_NOTIFICATION_LIST,
      error: null,
    });
  });

  it('should return error message when there are errors during getting notification list', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      get: jest.fn().mockResolvedValueOnce({
        data: [],
        meta: {},
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as unknown as ApiClient);

    const result = await getNotifications({});

    expect(result).toEqual({
      notifications: [],
      error: 'Something went wrong',
    });
  });

  it('should handle error exception when getting notification list', async () => {
    const api = jest.spyOn(apiClient, 'apiClientSession');

    api.mockResolvedValueOnce({
      get: jest.fn().mockRejectedValueOnce(new Error('Mock error exception')),
    } as unknown as ApiClient);

    let result = await getNotifications({});

    expect(result).toEqual({
      notifications: [],
      error: 'Mock error exception',
    });

    api.mockResolvedValueOnce({
      get: jest.fn().mockRejectedValueOnce({}),
    } as unknown as ApiClient);

    result = await getNotifications({});

    expect(result).toEqual({
      notifications: [],
      error: 'An unexpected error occurred in the request get notifications',
    });
  });

  it('should return the notification when adding', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      post: jest.fn().mockResolvedValueOnce({
        data: MOCK_NOTIFICATION_LIST[0],
        error: null,
      }),
    } as unknown as ApiClient);

    const result = await addNotification({
      ...MOCK_NOTIFICATION_LIST[0].attributes,
      senderId: '1',
    });

    expect(result).toEqual({
      notification: MOCK_NOTIFICATION_LIST[0],
      error: null,
    });
  });

  it('should return error message when there are errors during adding notification', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      post: jest.fn().mockResolvedValueOnce({
        data: null,
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as unknown as ApiClient);

    const result = await addNotification({
      ...MOCK_NOTIFICATION_LIST[0].attributes,
      senderId: '1',
    });

    expect(result).toEqual({
      notification: null,
      error: 'Something went wrong',
    });
  });

  it('should handle error exception when adding notification list', async () => {
    const api = jest.spyOn(apiClient, 'apiClientSession');

    api.mockResolvedValueOnce({
      post: jest.fn().mockRejectedValueOnce(new Error('Mock error exception')),
    } as unknown as ApiClient);

    let result = await addNotification({
      ...MOCK_NOTIFICATION_LIST[0].attributes,
      senderId: '1',
    });

    expect(result).toEqual({
      notification: null,
      error: 'Mock error exception',
    });

    api.mockResolvedValueOnce({
      post: jest.fn().mockRejectedValueOnce({}),
    } as unknown as ApiClient);

    result = await addNotification({
      ...MOCK_NOTIFICATION_LIST[0].attributes,
      senderId: '1',
    });

    expect(result).toEqual({
      notification: null,
      error: 'An unexpected error occurred in add notification',
    });
  });

  it('should return the notification when updating', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: jest.fn().mockResolvedValueOnce({
        data: MOCK_NOTIFICATION_LIST[0],
        error: null,
      }),
    } as unknown as ApiClient);

    const result = await updateNotification('1', {
      ...MOCK_NOTIFICATION_LIST[0].attributes,
      senderId: '1',
    });

    expect(result).toEqual({
      notification: MOCK_NOTIFICATION_LIST[0],
      error: null,
    });
  });

  it('should return error message when there are errors during updating notification', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      put: jest.fn().mockResolvedValueOnce({
        data: null,
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as unknown as ApiClient);

    const result = await updateNotification('1', {
      ...MOCK_NOTIFICATION_LIST[0].attributes,
      senderId: '1',
    });

    expect(result).toEqual({
      notification: null,
      error: 'Something went wrong',
    });
  });

  it('should handle error exception when updating notification list', async () => {
    const api = jest.spyOn(apiClient, 'apiClientSession');

    api.mockResolvedValueOnce({
      put: jest.fn().mockRejectedValueOnce(new Error('Mock error exception')),
    } as unknown as ApiClient);

    let result = await updateNotification('1', {
      ...MOCK_NOTIFICATION_LIST[0].attributes,
      senderId: '1',
    });

    expect(result).toEqual({
      notification: null,
      error: 'Mock error exception',
    });

    api.mockResolvedValueOnce({
      put: jest.fn().mockRejectedValueOnce({}),
    } as unknown as ApiClient);

    result = await updateNotification('1', {
      ...MOCK_NOTIFICATION_LIST[0].attributes,
      senderId: '1',
    });

    expect(result).toEqual({
      notification: null,
      error: 'An unexpected error occurred in update notification',
    });
  });

  it('should return the notification when deleting', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      delete: jest.fn().mockResolvedValueOnce({
        data: MOCK_NOTIFICATION_LIST[0],
        error: null,
      }),
    } as unknown as ApiClient);

    const result = await deleteNotification('1');

    expect(result).toEqual({
      notification: MOCK_NOTIFICATION_LIST[0],
      error: null,
    });
  });

  it('should return error message when there are errors during deleting notification', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      delete: jest.fn().mockResolvedValueOnce({
        data: null,
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as unknown as ApiClient);

    const result = await deleteNotification('1');

    expect(result).toEqual({
      notification: null,
      error: 'Something went wrong',
    });
  });

  it('should handle error exception when deleting notification', async () => {
    const api = jest.spyOn(apiClient, 'apiClientSession');

    api.mockResolvedValueOnce({
      delete: jest
        .fn()
        .mockRejectedValueOnce(new Error('Mock error exception')),
    } as unknown as ApiClient);

    let result = await deleteNotification('1');

    expect(result).toEqual({
      notification: null,
      error: 'Mock error exception',
    });

    api.mockResolvedValueOnce({
      delete: jest.fn().mockRejectedValueOnce({}),
    } as unknown as ApiClient);

    result = await deleteNotification('1');

    expect(result).toEqual({
      notification: null,
      error: 'An unexpected error occurred in delete notification',
    });
  });
});
