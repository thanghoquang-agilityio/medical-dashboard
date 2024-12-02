/**
 * @jest-environment node
 */
import { MOCK_USER_PAYLOAD, MOCK_USER_SESSION } from '@/mocks';
import { POST } from '../route';
import { UserModel, UserPayload } from '@/types';
import { HOST_DOMAIN, ROUTE_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';

jest.mock('@/services/api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/api'),
  apiClient: {
    post: jest.fn(),
  },
}));

describe('AddUser route handler', () => {
  const mockRequestData: UserPayload = MOCK_USER_PAYLOAD;

  let mockRequest: Request;

  beforeEach(() => {
    mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.ADD_USER}`,
      {
        method: 'POST',
        body: JSON.stringify(mockRequestData),
      },
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add user and return the response', async () => {
    const mockResponse: UserModel & { error: string | null } = {
      ...MOCK_USER_SESSION,
      error: null,
    };

    jest.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error when there is an exception', async () => {
    const mockResponse: UserModel & { error: string | null } = {
      ...MOCK_USER_SESSION,
      error: 'mock error',
    };

    jest.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });
});
