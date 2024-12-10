/**
 * @jest-environment node
 */
import {
  HOST_DOMAIN,
  ROUTE_ENDPOINT,
  SERVER_ERROR_MESSAGES,
} from '@/constants';
import { MOCK_APPOINTMENTS } from '@/mocks';
import { GET } from '../route';
import {
  AppointmentResponse,
  AppointmentsResponse,
  MetaResponse,
} from '@/types';
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
          Authorization: 'Bearer mock',
        },
      },
    );

    jest.spyOn(apiClient, 'get').mockResolvedValueOnce(mockDataResponse);

    const response = await GET(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockDataResponse);
  });

  it('should return the error when there is an exception', async () => {
    const mockDataResponse: {
      data: AppointmentResponse[] | null;
      error?: string;
      meta: MetaResponse;
    } = {
      data: null,
      error: 'mock',
      meta: {},
    };

    jest.spyOn(apiClient, 'get').mockResolvedValueOnce(mockDataResponse);

    const mockRequest = new NextRequest(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.GET_APPOINTMENTS}`,
      {
        headers: {
          Authorization: 'Bearer mock',
        },
      },
    );

    const response = await GET(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockDataResponse);
  });

  it('should return the error if bearer token is empty', async () => {
    const mockDataResponse: {
      data: AppointmentResponse[] | null;
      error?: string;
    } = {
      data: null,
      error: SERVER_ERROR_MESSAGES[403],
    };

    jest.spyOn(apiClient, 'get').mockResolvedValueOnce(mockDataResponse);

    const mockRequest = new NextRequest(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.GET_APPOINTMENTS}`,
    );

    const response = await GET(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockDataResponse);
  });
});
