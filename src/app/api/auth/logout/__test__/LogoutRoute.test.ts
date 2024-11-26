/**
 * @jest-environment node
 */
import { POST } from '../route';
import { AUTH_ROUTES } from '@/constants';
import { logout } from '@/services';

jest.mock('@/services', () => ({
  logout: jest.fn(),
}));
describe('Logout route handler', () => {
  const mockLogout = logout as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call logout and return the redirect', async () => {
    const mockResponse = AUTH_ROUTES.LOGIN;
    mockLogout.mockResolvedValueOnce(mockResponse);

    const response = await POST();

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });
});
