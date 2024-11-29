/**
 * @jest-environment node
 */
import { MOCK_APPOINTMENTS } from '@/mocks';
import { AppointmentPayload, AppointmentResponse } from '@/types';
import { HOST_DOMAIN, ROUTE_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { PUT } from '../route';

jest.mock('@/services/api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/api'),
  apiClient: {
    put: jest.fn(),
  },
}));

describe('UpdateAppointment route handler', () => {
  const mockRequestData: AppointmentPayload = {
    senderId: '1',
    startTime: '',
    durationTime: '',
    receiverId: '2',
    status: 0,
  };

  let mockRequest: Request;

  beforeEach(() => {
    mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.UPDATE_APPOINTMENT}`,
      {
        method: 'PUT',
        body: JSON.stringify(mockRequestData),
      },
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update appointment and return the response', async () => {
    const mockResponse: {
      data: AppointmentResponse;
      error?: string;
    } = {
      data: MOCK_APPOINTMENTS[0],
      error: undefined,
    };

    jest.spyOn(apiClient, 'put').mockResolvedValueOnce(mockResponse);

    const response = await PUT(mockRequest, {
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

    jest.spyOn(apiClient, 'put').mockResolvedValueOnce(mockResponse);

    const response = await PUT(mockRequest, {
      params: {
        id: '1',
      },
    });

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });
});
