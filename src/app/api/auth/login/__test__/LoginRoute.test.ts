/**
 * @jest-environment node
 */
import { MOCK_USERS_LOGGED } from '@/mocks';
import { POST } from '../route';
import { LoginFormData } from '@/types';
import { HOST_DOMAIN, ROUTE_ENDPOINT } from '@/constants';
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
    password: 'mock',
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
});
