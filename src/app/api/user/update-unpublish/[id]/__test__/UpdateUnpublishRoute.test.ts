/**
 * @jest-environment node
 */
import { HOST_DOMAIN, ROUTE_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';
import { PUT } from '../route';

jest.mock('@/services/api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/api'),
  apiClient: {
    put: jest.fn(),
  },
}));

describe('UpdateUnpublish route handler', () => {
  let mockRequest: Request;

  beforeEach(() => {
    mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.UPDATE_UNPUBLISH}/1`,
      {
        method: 'PUT',
        body: JSON.stringify({
          publishedAt: null,
        }),
      },
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update unpublish user and return the response', async () => {
    const mockResponse: { error: string | null } = {
      error: null,
    };

    jest.spyOn(apiClient, 'put').mockResolvedValueOnce(mockResponse);

    const response = await PUT(mockRequest, {
      params: {
        id: '1',
      },
    });

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error when there is an exception', async () => {
    const mockResponse: { error: string | null } = {
      error: 'mock error',
    };

    jest.spyOn(apiClient, 'put').mockResolvedValueOnce(mockResponse);

    const response = await PUT(mockRequest, {
      params: {
        id: '1',
      },
    });

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });
});
