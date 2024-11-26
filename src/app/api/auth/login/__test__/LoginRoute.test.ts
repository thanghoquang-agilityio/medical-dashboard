/**
 * @jest-environment node
 */
import { MOCK_USERS_LOGGED } from '@/mocks';
import { POST } from '../route';
import { LoginFormData } from '@/types';
import { LOCAL_HOST, ROUTE_ENDPOINT } from '@/constants';
import { login } from '@/actions/auth';

jest.mock('@/actions/auth', () => ({
  login: jest.fn(),
}));
describe('Login route handler', () => {
  const mockRequestData: LoginFormData = {
    identifier: MOCK_USERS_LOGGED[0].email,
    password: 'mock',
    remember: true,
  };

  let mockRequest: Request;

  const mockLogin = login as jest.Mock;

  beforeEach(() => {
    mockRequest = new Request(`${LOCAL_HOST}/${ROUTE_ENDPOINT.AUTH.LOGIN}`, {
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
    mockLogin.mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should call return the error when there is exception', async () => {
    const mockResponse = {
      user: null,
      error: 'mock',
    };
    mockLogin.mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });
});
