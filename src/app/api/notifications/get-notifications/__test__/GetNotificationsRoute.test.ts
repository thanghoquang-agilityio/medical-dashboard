/**
 * @jest-environment node
 */
import { HOST_DOMAIN, ROUTE_ENDPOINT } from '@/constants';
import { MOCK_NOTIFICATION_LIST } from '@/mocks';
import { getNotifications } from '@/services';
import { GET } from '../route';
import { MetaResponse, NotificationResponse } from '@/types';

jest.mock('@/services', () => ({
  getNotifications: jest.fn(),
}));

describe('GetNotifications route handler', () => {
  const mockGetNotifications = getNotifications as jest.Mock;
  const mockDataResponse: {
    notifications: NotificationResponse[];
    error: string | null;
  } & MetaResponse = {
    notifications: MOCK_NOTIFICATION_LIST,
    error: null,
  };

  let mockDataRequest: Request;

  beforeEach(() => {
    mockDataRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.GET_LOGGED}`,
      {
        headers: {
          tags: 'mock',
        },
      },
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the notification list', async () => {
    mockGetNotifications.mockResolvedValueOnce(mockDataResponse);

    const response = await GET(mockDataRequest);

    const result: {
      notifications: NotificationResponse[];
      error: string | null;
    } = await response.json();

    expect(result).toEqual(mockDataResponse);
  });

  it('should return the error when there is an exception', async () => {
    mockGetNotifications.mockResolvedValueOnce({
      notifications: null,
      error: 'mock',
    });

    const request = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.GET_LOGGED}`,
      {
        headers: undefined,
      },
    );
    const response = await GET(request);

    const result: {
      notifications: NotificationResponse[];
      error: string | null;
    } = await response.json();

    expect(result).toEqual({
      notifications: null,
      error: 'mock',
    });
  });
});
