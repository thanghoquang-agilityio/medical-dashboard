/**
 * @jest-environment node
 */
import { MOCK_USER_SESSION } from '@/mocks';
import { POST } from '../route';
import { UserSession } from '@/types';
import { HOST_DOMAIN, PRIVATE_ROUTES, ROUTE_ENDPOINT } from '@/constants';
import { loginNextAuth } from '@/actions/auth';

jest.mock('@/actions/auth', () => ({
  loginNextAuth: jest.fn(),
}));
describe('LoginNextAuth route handler', () => {
  const mockRequestData: UserSession = MOCK_USER_SESSION;

  let mockRequest: Request;

  const mockLoginNextAuth = loginNextAuth as jest.Mock;

  beforeEach(() => {
    mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.AUTH.LOGIN_NEXT_AUTH}`,
      {
        method: 'POST',
        body: JSON.stringify(mockRequestData),
      },
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call login with correct data and return the url to redirect', async () => {
    mockLoginNextAuth.mockResolvedValueOnce(mockRequestData);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(PRIVATE_ROUTES.DASHBOARD);
  });
});
