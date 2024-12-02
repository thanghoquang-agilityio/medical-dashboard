/**
 * @jest-environment node
 */
import { HOST_DOMAIN, ROUTE_ENDPOINT } from '@/constants';
import { MOCK_SPECIALTIES } from '@/mocks';
import { apiClient } from '@/services';
import { GET } from '../route';
import { SpecialtiesResponse } from '@/types';
import { NextRequest } from 'next/server';
jest.mock('@/services/api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/api'),
  apiClient: {
    get: jest.fn(),
  },
}));

describe('GetSpecialties route handler', () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    mockRequest = new NextRequest(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.SPECIALTY.GET_SPECIALTIES}`,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the list of specialty', async () => {
    const mockResponse: SpecialtiesResponse & { error?: string } = {
      data: MOCK_SPECIALTIES,
      meta: {},
      error: undefined,
    };

    jest.spyOn(apiClient, 'get').mockResolvedValue(mockResponse);

    const response = await GET(mockRequest);

    const result: SpecialtiesResponse & { error?: string } =
      await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error when there is an exception', async () => {
    mockRequest = new NextRequest(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.SPECIALTY.GET_SPECIALTIES}`,
    );

    const mockResponse: SpecialtiesResponse & { error?: string } = {
      data: [],
      meta: {},
      error: 'mock',
    };
    jest.spyOn(apiClient, 'get').mockResolvedValue(mockResponse);

    const response = await GET(mockRequest);

    const result: SpecialtiesResponse & { error?: string } =
      await response.json();

    expect(result).toEqual(mockResponse);
  });
});
