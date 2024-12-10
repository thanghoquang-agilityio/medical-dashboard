/**
 * @jest-environment node
 */
import { MOCK_APPOINTMENTS } from '@/mocks';
import { AppointmentResponse } from '@/types';
import {
  HOST_DOMAIN,
  ROUTE_ENDPOINT,
  SERVER_ERROR_MESSAGES,
} from '@/constants';
import { apiClient } from '@/services';
import { DELETE } from '../route';

jest.mock('@/services/api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/api'),
  apiClient: {
    delete: jest.fn(),
  },
}));

describe('DeleteAppointment route handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete appointment and return the response', async () => {
    const mockResponse: {
      data: AppointmentResponse;
      error?: string;
    } = {
      data: MOCK_APPOINTMENTS[0],
      error: undefined,
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.UPDATE_APPOINTMENT}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer mock`,
        },
      },
    );

    jest.spyOn(apiClient, 'delete').mockResolvedValueOnce(mockResponse);

    const response = await DELETE(mockRequest, {
      params: {
        id: '1',
      },
    });

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error when there is an exception', async () => {
    const mockResponse = {
      data: null,
      error: 'mock error',
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.UPDATE_APPOINTMENT}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer mock`,
        },
      },
    );

    jest.spyOn(apiClient, 'delete').mockResolvedValueOnce(mockResponse);

    const response = await DELETE(mockRequest, {
      params: {
        id: '1',
      },
    });

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error if bearer token is empty', async () => {
    const mockResponse = {
      data: null,
      error: SERVER_ERROR_MESSAGES[403],
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.UPDATE_APPOINTMENT}`,
      {
        method: 'DELETE',
      },
    );

    jest.spyOn(apiClient, 'delete').mockResolvedValueOnce(mockResponse);

    const response = await DELETE(mockRequest, {
      params: {
        id: '1',
      },
    });

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error if id is empty', async () => {
    const mockResponse = {
      data: null,
      error: 'No id provided',
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.UPDATE_APPOINTMENT}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer mock`,
        },
      },
    );

    jest.spyOn(apiClient, 'delete').mockResolvedValueOnce(mockResponse);

    const response = await DELETE(mockRequest, {
      params: {
        id: '',
      },
    });

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });
});
