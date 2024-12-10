/**
 * @jest-environment node
 */
import {
  HOST_DOMAIN,
  ROUTE_ENDPOINT,
  SERVER_ERROR_MESSAGES,
} from '@/constants';
import { apiClient } from '@/services';
import { PUT } from '../route';

jest.mock('@/services/api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/api'),
  apiClient: {
    put: jest.fn(),
  },
}));

describe('UpdateUnpublishAppointment route handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update unpublish appointment and return the response', async () => {
    const mockResponse: { error: string | null } = {
      error: null,
    };

    jest.spyOn(apiClient, 'put').mockResolvedValueOnce(mockResponse);

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.UPDATE_UNPUBLISH_APPOINTMENT}/1`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer mock`,
        },
      },
    );

    const response = await PUT(mockRequest, {
      params: {
        id: '1',
      },
    });

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error when there is an exception', async () => {
    const mockResponse: { error: string | null } = {
      error: 'mock error',
    };

    jest.spyOn(apiClient, 'put').mockResolvedValueOnce(mockResponse);

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.UPDATE_UNPUBLISH_APPOINTMENT}/1`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer mock`,
        },
      },
    );

    const response = await PUT(mockRequest, {
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
        method: 'PUT',
      },
    );

    jest.spyOn(apiClient, 'put').mockResolvedValueOnce(mockResponse);

    const response = await PUT(mockRequest, {
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
        method: 'PUT',
        headers: {
          Authorization: `Bearer mock`,
        },
      },
    );

    jest.spyOn(apiClient, 'put').mockResolvedValueOnce(mockResponse);

    const response = await PUT(mockRequest, {
      params: {
        id: '',
      },
    });

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });
});
