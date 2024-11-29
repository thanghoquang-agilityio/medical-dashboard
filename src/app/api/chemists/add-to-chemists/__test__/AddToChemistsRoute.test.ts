/**
 * @jest-environment node
 */
import { MOCK_CHEMISTS_LIST } from '@/mocks';
import { POST } from '../route';
import { ChemistDataResponse, ChemistPayload } from '@/types';
import { HOST_DOMAIN, ROUTE_ENDPOINT } from '@/constants';
import { apiClient } from '@/services';

jest.mock('@/services', () => ({
  addUserToChemists: jest.fn(),
}));

jest.mock('@/services/api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/api'),
  apiClient: {
    post: jest.fn(),
  },
}));

describe('AddToChemists route handler', () => {
  const mockRequestData: ChemistPayload = {
    users_permissions_user: '8',
  };

  let mockRequest: Request;

  beforeEach(() => {
    mockRequest = new Request(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.CHEMISTS.ADD_TO_CHEMISTS}`,
      {
        method: 'POST',
        body: JSON.stringify(mockRequestData),
      },
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add user to the chemists and return the response', async () => {
    const mockResponse: ChemistDataResponse = {
      chemist: MOCK_CHEMISTS_LIST[0],
      error: null,
    };

    jest.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error when there is an exception', async () => {
    const mockResponse: ChemistDataResponse = {
      chemist: null,
      error: 'mock',
    };

    jest.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });
});
