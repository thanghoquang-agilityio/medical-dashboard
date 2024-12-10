/**
 * @jest-environment node
 */
import { MOCK_SIGN_UP_FORM_DATA, MOCK_USER_SESSION } from '@/mocks';
import { POST } from '../route';
import { AuthResponse, SignupFormData } from '@/types';
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

describe('Signup route handler', () => {
  const mockRequestData: SignupFormData = MOCK_SIGN_UP_FORM_DATA;

  let mockRequest: Request;

  beforeEach(() => {
    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.SIGNUP}`, {
      method: 'POST',
      body: JSON.stringify(mockRequestData),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call sign up with correct data and return the response', async () => {
    const mockResponse: AuthResponse = {
      user: MOCK_USER_SESSION,
      error: null,
      jwt: 'mock',
    };

    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    const response = await POST(mockRequest);

    const result: AuthResponse = await response.json();

    expect(result.user).toEqual(mockResponse.user);
  });

  it('should return error when there is an exception', async () => {
    jest.spyOn(apiClient, 'post').mockResolvedValue({
      user: null,
      error: 'Mock error exception',
      jwt: '',
    });

    const response = await POST(mockRequest);

    const result: AuthResponse = await response.json();

    expect(result.error).toEqual('Mock error exception');
  });

  it('should return error if empty body', async () => {
    const mockResponse: AuthResponse = {
      user: null,
      error: 'Request body is not found',
      jwt: '',
    };
    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.SIGNUP}`, {
      method: 'POST',
    });

    const response = await POST(mockRequest);

    const result: AuthResponse = await response.json();

    expect(result.error).toEqual(mockResponse.error);
  });

  it('should return error if email is empty', async () => {
    const mockResponse: AuthResponse = {
      user: null,
      error: FORM_VALIDATION_MESSAGE.REQUIRED('Email'),
      jwt: '',
    };
    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.SIGNUP}`, {
      method: 'POST',
      body: JSON.stringify({ ...mockRequestData, email: '' }),
    });

    const response = await POST(mockRequest);

    const result: AuthResponse = await response.json();

    expect(result.error).toEqual(mockResponse.error);
  });

  it('should return error if username is empty', async () => {
    const mockResponse: AuthResponse = {
      user: null,
      error: FORM_VALIDATION_MESSAGE.REQUIRED('Name'),
      jwt: '',
    };
    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.SIGNUP}`, {
      method: 'POST',
      body: JSON.stringify({ ...mockRequestData, username: '' }),
    });

    const response = await POST(mockRequest);

    const result: AuthResponse = await response.json();

    expect(result.error).toEqual(mockResponse.error);
  });

  it('should return error if password is empty', async () => {
    const mockResponse: AuthResponse = {
      user: null,
      error: FORM_VALIDATION_MESSAGE.REQUIRED('Password'),
      jwt: '',
    };
    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.SIGNUP}`, {
      method: 'POST',
      body: JSON.stringify({ ...mockRequestData, password: '' }),
    });

    const response = await POST(mockRequest);

    const result: AuthResponse = await response.json();

    expect(result.error).toEqual(mockResponse.error);
  });

  it('should return error if confirmPassword is empty', async () => {
    const mockResponse: AuthResponse = {
      user: null,
      error: FORM_VALIDATION_MESSAGE.REQUIRED('Confirm Password'),
      jwt: '',
    };
    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.SIGNUP}`, {
      method: 'POST',
      body: JSON.stringify({ ...mockRequestData, confirmPassWord: '' }),
    });

    const response = await POST(mockRequest);

    const result: AuthResponse = await response.json();

    expect(result.error).toEqual(mockResponse.error);
  });

  it('should return error if username contains non-alphabet characters', async () => {
    const mockResponse: AuthResponse = {
      user: null,
      error: FORM_VALIDATION_MESSAGE.ONLY_TEXT,
      jwt: '',
    };
    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.SIGNUP}`, {
      method: 'POST',
      body: JSON.stringify({ ...mockRequestData, username: 'john1' }),
    });

    const response = await POST(mockRequest);

    const result: AuthResponse = await response.json();

    expect(result.error).toEqual(mockResponse.error);
  });

  it('should return error if username are less than 3 characters', async () => {
    const mockResponse: AuthResponse = {
      user: null,
      error: FORM_VALIDATION_MESSAGE.MIN_LENGTH('Username', 3),
      jwt: '',
    };
    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.SIGNUP}`, {
      method: 'POST',
      body: JSON.stringify({ ...mockRequestData, username: 'joh' }),
    });

    const response = await POST(mockRequest);

    const result: AuthResponse = await response.json();

    expect(result.error).toEqual(mockResponse.error);
  });

  it('should return error if email is not in a valid format', async () => {
    const mockResponse: AuthResponse = {
      user: null,
      error: FORM_VALIDATION_MESSAGE.INVALID('Email'),
      jwt: '',
    };
    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.SIGNUP}`, {
      method: 'POST',
      body: JSON.stringify({ ...mockRequestData, email: 'johnmail' }),
    });

    const response = await POST(mockRequest);

    const result: AuthResponse = await response.json();

    expect(result.error).toEqual(mockResponse.error);
  });

  it('should return error if passwords are less than 8 characters', async () => {
    const mockResponse: AuthResponse = {
      user: null,
      error: FORM_VALIDATION_MESSAGE.MIN_LENGTH('Password', 8),
      jwt: '',
    };
    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.SIGNUP}`, {
      method: 'POST',
      body: JSON.stringify({ ...mockRequestData, password: 'a' }),
    });

    const response = await POST(mockRequest);

    const result: AuthResponse = await response.json();

    expect(result.error).toEqual(mockResponse.error);
  });

  it('should return error if passwords are more than 32 characters', async () => {
    const mockResponse: AuthResponse = {
      user: null,
      error: FORM_VALIDATION_MESSAGE.MAX_LENGTH('Password', 32),
      jwt: '',
    };
    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.SIGNUP}`, {
      method: 'POST',
      body: JSON.stringify({
        ...mockRequestData,
        password:
          'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      }),
    });

    const response = await POST(mockRequest);

    const result: AuthResponse = await response.json();

    expect(result.error).toEqual(mockResponse.error);
  });

  it('should return error if passwords contain only white space', async () => {
    const mockResponse: AuthResponse = {
      user: null,
      error: FORM_VALIDATION_MESSAGE.ALL_WHITE_SPACE('Password'),
      jwt: '',
    };
    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.SIGNUP}`, {
      method: 'POST',
      body: JSON.stringify({
        ...mockRequestData,
        password: '               ',
      }),
    });

    const response = await POST(mockRequest);

    const result: AuthResponse = await response.json();

    expect(result.error).toEqual(mockResponse.error);
  });

  it('should return error if confirm password is not match with password', async () => {
    const mockResponse: AuthResponse = {
      user: null,
      error: FORM_VALIDATION_MESSAGE.PASSWORD_NOT_MATCH,
      jwt: '',
    };
    jest.spyOn(apiClient, 'post').mockResolvedValue(mockResponse);

    mockRequest = new Request(`${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.SIGNUP}`, {
      method: 'POST',
      body: JSON.stringify({
        ...mockRequestData,
        password: 'john@123',
        confirmPassWord: 'john@1234',
      }),
    });

    const response = await POST(mockRequest);

    const result: AuthResponse = await response.json();

    expect(result.error).toEqual(mockResponse.error);
  });
});
