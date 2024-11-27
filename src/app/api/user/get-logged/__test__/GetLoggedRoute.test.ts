/**
 * @jest-environment node
 */
import { HOST_DOMAIN, ROUTE_ENDPOINT } from '@/constants';
import { MOCK_USERS_LOGGED } from '@/mocks';
import { getUserLogged } from '@/services';
import { GET } from '../route';
import { UserLogged } from '@/types';

jest.mock('@/services', () => ({
  getUserLogged: jest.fn(),
}));

describe('GetLogged route handler', () => {
  const mockGetUserLogged = getUserLogged as jest.Mock;

  let mockDataRequest: Request;

  beforeEach(() => {
    mockDataRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.GET_LOGGED}`,
      {
        headers: {
          Authorization: `Bearer mock`,
        },
      },
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get information about the logged in user', async () => {
    mockGetUserLogged.mockResolvedValueOnce({
      user: MOCK_USERS_LOGGED[0],
      error: null,
    });

    const response = await GET(mockDataRequest);

    const result: {
      user: UserLogged | null;
      error: string | null;
    } = await response.json();

    expect(result).toEqual({
      user: MOCK_USERS_LOGGED[0],
      error: null,
    });
  });

  it('should return the error when there is an exception', async () => {
    mockGetUserLogged.mockResolvedValueOnce({
      user: null,
      error: 'mock',
    });

    const response = await GET(mockDataRequest);

    const result: {
      user: UserLogged | null;
      error: string | null;
    } = await response.json();

    expect(result).toEqual({
      user: null,
      error: 'mock',
    });
  });
});
