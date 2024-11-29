/**
 * @jest-environment node
 */
import { USER_OPTIONS } from '@/mocks';
import { PUT } from '../route';
import { UserModel } from '@/types';
import { HOST_DOMAIN, ROUTE_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';

jest.mock('@/services', () => ({
  updatePublishUser: jest.fn(),
}));

jest.mock('@/services/api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/api'),
  apiClient: {
    put: jest.fn(),
  },
}));
describe('UpdatePublish route handler', () => {
  const mockRequestData = '1';

  let mockRequest: Request;

  beforeEach(() => {
    mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.UPDATE_PUBLISH}`,
      {
        method: 'PUT',
        body: mockRequestData,
      },
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update publish of user and return the response', async () => {
    const mockResponse: {
      user: UserModel | null;
      error: string | null;
    } = {
      user: USER_OPTIONS[0],
      error: null,
    };

    jest.spyOn(apiClient, 'put').mockResolvedValueOnce(mockResponse);

    const response = await PUT(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error when there is an exception', async () => {
    const mockResponse: {
      user: UserModel | null;
      error: string | null;
    } = {
      user: null,
      error: 'mock',
    };

    jest.spyOn(apiClient, 'put').mockResolvedValueOnce(mockResponse);

    const response = await PUT(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });
});
