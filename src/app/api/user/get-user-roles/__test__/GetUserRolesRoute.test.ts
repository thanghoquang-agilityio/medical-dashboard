/**
 * @jest-environment node
 */
import { HOST_DOMAIN, ROUTE_ENDPOINT } from '@/constants';
import { MOCK_USER_ROLE } from '@/mocks';
import { apiClient } from '@/services';
import { GET } from '../route';
import { RolesResponse } from '@/types';
import { NextRequest } from 'next/server';
jest.mock('@/services/api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/api'),
  apiClient: {
    get: jest.fn(),
  },
}));

describe('GetUserRoles route handler', () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    mockRequest = new NextRequest(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.GET_USER_ROLES}`,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the role list', async () => {
    const mockResponse: RolesResponse = {
      roles: MOCK_USER_ROLE,
      error: null,
    };

    jest.spyOn(apiClient, 'get').mockResolvedValue(mockResponse);

    const response = await GET(mockRequest);

    const result: RolesResponse = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error when there is an exception', async () => {
    mockRequest = new NextRequest(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.GET_LOGGED}`,
      {
        headers: undefined,
      },
    );

    const mockResponse: RolesResponse = {
      roles: [],
      error: 'mock',
    };

    jest.spyOn(apiClient, 'get').mockResolvedValue(mockResponse);

    const response = await GET(mockRequest);

    const result: RolesResponse = await response.json();

    expect(result).toEqual(mockResponse);
  });
});
