/**
 * @jest-environment node
 */
import { MOCK_TRANSFER_RESPONSE } from '@/mocks';
import { POST } from '../route';
import {
  APIRelatedResponse,
  AppointmentResponse,
  TransferPayload,
  TransferResponse,
} from '@/types';
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

describe('AddTransfer route handler', () => {
  const mockRequestData: APIRelatedResponse<TransferPayload> = {
    data: {
      senderId: '1',
      receiverId: '2',
      amount: 100,
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should add transfer and return the response when data is valid', async () => {
    const mockResponse: TransferResponse = {
      data: MOCK_TRANSFER_RESPONSE,
      error: null,
      meta: {},
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.TRANSFER.ADD_TRANSFER}`,
      {
        method: 'POST',
        body: JSON.stringify(mockRequestData),
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
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.TRANSFER.ADD_TRANSFER}`,
      {
        method: 'POST',
        body: JSON.stringify(mockRequestData),
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
    const mockResponse = {
      data: null,
      error: SERVER_ERROR_MESSAGES[401],
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.TRANSFER.ADD_TRANSFER}`,
      {
        method: 'POST',
        body: JSON.stringify(mockRequestData),
      },
    );

    jest.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return error if empty body', async () => {
    const mockResponse = {
      data: null,
      error: 'Request body is not found',
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.TRANSFER.ADD_TRANSFER}`,
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
    const mockResponse = {
      data: null,
      error: 'No data provided',
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.TRANSFER.ADD_TRANSFER}`,
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
    const mockResponse = {
      data: null,
      error: FORM_VALIDATION_MESSAGE.REQUIRED('senderId'),
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.TRANSFER.ADD_TRANSFER}`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            ...mockRequestData.data,
            senderId: undefined,
          },
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

  it('should return error if receiverId is empty or invalid', async () => {
    const mockResponse: {
      data: AppointmentResponse | null;
      error?: string;
    } = {
      data: null,
      error: FORM_VALIDATION_MESSAGE.REQUIRED('receiverId'),
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.TRANSFER.ADD_TRANSFER}`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            ...mockRequestData.data,
            receiverId: undefined,
          },
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

  it('should return error if senderId is the same as receiverId', async () => {
    const mockResponse: {
      data: AppointmentResponse | null;
      error?: string;
    } = {
      data: null,
      error: FORM_VALIDATION_MESSAGE.NOT_SAME_AS_SENDER,
    };

    const mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.TRANSFER.ADD_TRANSFER}`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            ...mockRequestData.data,
            receiverId: mockRequestData.data.senderId,
          },
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
});
