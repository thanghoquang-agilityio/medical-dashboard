/**
 * @jest-environment node
 */
import { MOCK_SIGN_UP_FORM_DATA, MOCK_USER_SESSION } from '@/mocks';
import { POST } from '../route';
import { AuthResponse, SignupFormData } from '@/types';
import { HOST_DOMAIN, ROUTE_ENDPOINT } from '@/constants';
import { signup } from '@/actions/auth';

jest.mock('@/actions/auth', () => ({
  signup: jest.fn(),
}));
describe('Signup route handler', () => {
  const mockRequestData: SignupFormData = MOCK_SIGN_UP_FORM_DATA;

  const mockResponse: AuthResponse = {
    user: MOCK_USER_SESSION,
    error: null,
    jwt: 'mock',
  };

  let mockRequest: Request;

  const mockSignup = signup as jest.Mock;

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
    mockSignup.mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result: AuthResponse = await response.json();

    expect(result.user).toEqual(mockResponse.user);
  });

  it('should return error when there is an exception', async () => {
    mockSignup.mockResolvedValueOnce({
      user: null,
      error: 'Mock error exception',
      jwt: '',
    });

    const response = await POST(mockRequest);

    const result: AuthResponse = await response.json();

    expect(result.error).toEqual('Mock error exception');
  });
});
