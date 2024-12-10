/**
 * @jest-environment node
 */
import { MOCK_USERS_LOGGED } from '@/mocks';
import { POST } from '../route';
import { LoginFormData } from '@/types';
import {
  FORM_VALIDATION_MESSAGE,
  HOST_DOMAIN,
  ROUTE_ENDPOINT,
} from '@/constants';
import { apiClient } from '@/services';

jest.mock('@/services/api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/api'),
  apiClient: {
    post: jest.fn(),
  },
}));

describe('Login route handler', () => {
  const mockRequestData: LoginFormData = {
    identifier: MOCK_USERS_LOGGED[0].email,
    password: 'mockpassword',
    remember: true,
  };

  let mockRequest: Request;

  beforeEach(() => {
    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.LOGIN}`, {
      method: 'POST',
      body: JSON.stringify(mockRequestData),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call login with correct data and return the response', async () => {
    const mockResponse = {
      user: MOCK_USERS_LOGGED[0],
      error: null,
    };

    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error when there is an exception', async () => {
    const mockResponse = {
      user: null,
      error: 'mock',
    };

    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error if empty body', async () => {
    const mockResponse = {
      data: null,
      error: 'Request body is not found',
    };

    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.LOGIN}`, {
      method: 'POST',
    });

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error if identifier or password is undefined', async () => {
    const mockResponse = {
      data: null,
      error: 'Identifier and password are required',
    };

    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.LOGIN}`, {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error if identifier is not a valid email format', async () => {
    const mockResponse = {
      data: null,
      error: FORM_VALIDATION_MESSAGE.INVALID('Identifier'),
    };

    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.LOGIN}`, {
      method: 'POST',
      body: JSON.stringify({
        ...mockRequestData,
        identifier: 'invalid_email',
      }),
    });

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error if passwords are less than 8 characters', async () => {
    const mockResponse = {
      data: null,
      error: FORM_VALIDATION_MESSAGE.MIN_LENGTH('Password', 8),
    };

    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.LOGIN}`, {
      method: 'POST',
      body: JSON.stringify({
        ...mockRequestData,
        password: 'a',
      }),
    });

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error if passwords are more than 32 characters', async () => {
    const mockResponse = {
      data: null,
      error: FORM_VALIDATION_MESSAGE.MAX_LENGTH('Password', 32),
    };

    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.LOGIN}`, {
      method: 'POST',
      body: JSON.stringify({
        ...mockRequestData,
        password:
          'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      }),
    });

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error if passwords contain only white space', async () => {
    const mockResponse = {
      data: null,
      error: FORM_VALIDATION_MESSAGE.ALL_WHITE_SPACE('Password'),
    };

    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.LOGIN}`, {
      method: 'POST',
      body: JSON.stringify({
        ...mockRequestData,
        password: '                     ',
      }),
    });

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });
});
