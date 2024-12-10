/**
 * @jest-environment node
 */
import { MOCK_APPOINTMENTS } from '@/mocks';
import { POST } from '../route';
import { AppointmentPayload, AppointmentResponse } from '@/types';
import {
  FORM_VALIDATION_MESSAGE,
  HOST_DOMAIN,
  ROUTE_ENDPOINT,
  SERVER_ERROR_MESSAGES,
} from '@/constants';
import { apiClient } from '@/services';

jest.mock('@/services/api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/api'),
  apiClient: {
    post: jest.fn(),
  },
}));

describe('AddAppointment route handler', () => {
  const mockRequestData: AppointmentPayload = {
    senderId: '1',
    startTime: '2026-09-11T06:30:00.000Z',
    durationTime: '01:30:00',
    receiverId: '2',
    status: 0,
  };

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should add appointment and return the response when data is valid', async () => {
    const mockResponse: {
      data: AppointmentResponse;
      error?: string;
    } = {
      data: MOCK_APPOINTMENTS[0],
      error: undefined,
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.ADD_APPOINTMENT}`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: mockRequestData,
        }),
        headers: {
          Authorization: 'Bearer mock',
        },
      },
    );

    jest.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error when there is an exception', async () => {
    const mockResponse = {
      data: null,
      error: 'mock error',
    };

    jest.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.ADD_APPOINTMENT}`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: mockRequestData,
        }),
        headers: {
          Authorization: 'Bearer mock',
        },
      },
    );

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });
  it('should check bearer token and return error if empty', async () => {
    const mockResponse: {
      data: AppointmentResponse | null;
      error?: string;
    } = {
      data: null,
      error: SERVER_ERROR_MESSAGES[403],
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.ADD_APPOINTMENT}`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: mockRequestData,
        }),
      },
    );

    jest.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return error if empty body', async () => {
    const mockResponse: {
      data: AppointmentResponse | null;
      error?: string;
    } = {
      data: null,
      error: 'Request body is not found',
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.ADD_APPOINTMENT}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer mock',
        },
      },
    );

    jest.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return error if empty body data', async () => {
    const mockResponse: {
      data: AppointmentResponse | null;
      error?: string;
    } = {
      data: null,
      error: 'No data provided',
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.ADD_APPOINTMENT}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer mock',
        },
        body: '{}',
      },
    );

    jest.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return error if senderId is empty or invalid', async () => {
    const mockResponse: {
      data: AppointmentResponse | null;
      error?: string;
    } = {
      data: null,
      error: FORM_VALIDATION_MESSAGE.REQUIRED('senderId'),
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.ADD_APPOINTMENT}`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: { ...mockRequestData, senderId: undefined },
        }),
        headers: {
          Authorization: 'Bearer mock',
        },
      },
    );
    jest.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return error if receiverId is empty or invalid', async () => {
    const mockResponse: {
      data: AppointmentResponse | null;
      error?: string;
    } = {
      data: null,
      error: FORM_VALIDATION_MESSAGE.REQUIRED('receiverId'),
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.ADD_APPOINTMENT}`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: { ...mockRequestData, receiverId: undefined },
        }),
        headers: {
          Authorization: 'Bearer mock',
        },
      },
    );
    jest.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return error if startTime is empty or invalid', async () => {
    const mockResponse: {
      data: AppointmentResponse | null;
      error?: string;
    } = {
      data: null,
      error: FORM_VALIDATION_MESSAGE.REQUIRED('startTime'),
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.ADD_APPOINTMENT}`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: { ...mockRequestData, startTime: undefined },
        }),
        headers: {
          Authorization: 'Bearer mock',
        },
      },
    );
    jest.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return error if durationTime is empty or invalid', async () => {
    const mockResponse: {
      data: AppointmentResponse | null;
      error?: string;
    } = {
      data: null,
      error: FORM_VALIDATION_MESSAGE.REQUIRED('durationTime'),
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.ADD_APPOINTMENT}`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: { ...mockRequestData, durationTime: undefined },
        }),
        headers: {
          Authorization: 'Bearer mock',
        },
      },
    );
    jest.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return error if status is empty or invalid', async () => {
    const mockResponse: {
      data: AppointmentResponse | null;
      error?: string;
    } = {
      data: null,
      error: FORM_VALIDATION_MESSAGE.REQUIRED('status'),
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.ADD_APPOINTMENT}`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: { ...mockRequestData, status: undefined },
        }),
        headers: {
          Authorization: 'Bearer mock',
        },
      },
    );
    jest.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return error if startTime is in the past', async () => {
    const mockResponse: {
      data: AppointmentResponse | null;
      error?: string;
    } = {
      data: null,
      error: FORM_VALIDATION_MESSAGE.MIN_TIME('The start time'),
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.ADD_APPOINTMENT}`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: { ...mockRequestData, startTime: '2023-09-11T06:30:00.000Z' },
        }),
        headers: {
          Authorization: 'Bearer mock',
        },
      },
    );
    jest.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });
});
