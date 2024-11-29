/**
 * @jest-environment node
 */
import { HOST_DOMAIN, ROUTE_ENDPOINT } from '@/constants';
import { MOCK_APPOINTMENTS } from '@/mocks';
import { GET } from '../route';
import { AppointmentsResponse } from '@/types';
import { apiClient } from '@/services';
import { NextRequest } from 'next/server';

jest.mock('@/services/api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/api'),
  apiClient: {
    get: jest.fn(),
  },
}));
describe('GetAppointments route handler', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the appointments list', async () => {
    const mockDataResponse: AppointmentsResponse & { error?: string } = {
      data: MOCK_APPOINTMENTS,
      error: undefined,
      meta: {},
    };

    const mockRequest = new NextRequest(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.GET_APPOINTMENTS}`,
      {
        headers: {
          tags: 'mock',
        },
      },
    );

    jest.spyOn(apiClient, 'get').mockResolvedValueOnce(mockDataResponse);

    const response = await GET(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockDataResponse);
  });

  it('should return the error when there is an exception', async () => {
    const mockDataResponse: AppointmentsResponse & { error?: string } = {
      data: [],
      error: 'mock',
      meta: {},
    };

    jest.spyOn(apiClient, 'get').mockResolvedValueOnce(mockDataResponse);

    const mockRequest = new NextRequest(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.GET_LOGGED}`,
      {
        headers: undefined,
      },
    );
    const response = await GET(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockDataResponse);
  });
});
