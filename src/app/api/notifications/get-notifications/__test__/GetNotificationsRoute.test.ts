/**
 * @jest-environment node
 */
import { HOST_DOMAIN, ROUTE_ENDPOINT } from '@/constants';
import { MOCK_NOTIFICATION_LIST } from '@/mocks';
import { GET } from '../route';
import { MetaResponse, NotificationResponse } from '@/types';
import { apiClient } from '@/services';
import { NextRequest } from 'next/server';

jest.mock('@/services/api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/api'),
  apiClient: {
    get: jest.fn(),
  },
}));
describe('GetNotifications route handler', () => {
  const mockDataResponse: {
    notifications: NotificationResponse[];
    error: string | null;
  } & MetaResponse = {
    notifications: MOCK_NOTIFICATION_LIST,
    error: null,
  };

  let mockDataRequest: NextRequest;

  beforeEach(() => {
    mockDataRequest = new NextRequest(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.NOTIFICATIONS.GET_NOTIFICATIONS}`,
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
    jest.spyOn(apiClient, 'get').mockResolvedValueOnce(mockDataResponse);

    const response = await GET(mockDataRequest);

    const result: {
      notifications: NotificationResponse[];
      error: string | null;
    } = await response.json();

    expect(result).toEqual(mockDataResponse);
  });

  it('should return the error when there is an exception', async () => {
    jest.spyOn(apiClient, 'get').mockResolvedValueOnce({
      notifications: null,
      error: 'mock',
    });

    const request = new NextRequest(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.GET_APPOINTMENTS}`,
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
