/**
 * @jest-environment node
 */
import { HOST_DOMAIN, ROUTE_ENDPOINT } from '@/constants';
import { MOCK_USERS_LOGGED } from '@/mocks';
import { apiClient } from '@/services';
import { GET } from '../route';
import { UserLogged } from '@/types';
import { NextRequest } from 'next/server';
jest.mock('@/services/api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/api'),
  apiClient: {
    get: jest.fn(),
  },
}));

describe('GetUsers route handler', () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    mockRequest = new NextRequest(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.GET_USERS}`,
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

  it('should return the user list', async () => {
    const mockResponse = {
      ...MOCK_USERS_LOGGED,
      error: null,
    };

    jest.spyOn(apiClient, 'get').mockResolvedValue(mockResponse);

    const response = await GET(mockRequest);

    const result: UserLogged[] & { error: string | null } =
      await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error when there is an exception', async () => {
    mockRequest = new NextRequest(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.GET_LOGGED}`,
      {
        headers: undefined,
      },
    );

    const mockResponse = {
      user: [],
      error: 'mock',
    };

    jest.spyOn(apiClient, 'get').mockResolvedValue(mockResponse);

    const response = await GET(mockRequest);

    const result: UserLogged[] & { error: string | null } =
      await response.json();

    expect(result).toEqual(mockResponse);
  });
});