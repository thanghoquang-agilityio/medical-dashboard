/**
 * @jest-environment node
 */
import {
  HOST_DOMAIN,
  ROUTE_ENDPOINT,
  SERVER_ERROR_MESSAGES,
} from '@/constants';
import { MOCK_CHEMISTS_LIST } from '@/mocks';
import { GET } from '../route';
import { ChemistResponse, ChemistsResponse } from '@/types';
import { apiClient } from '@/services';
import { NextRequest } from 'next/server';

jest.mock('@/services/api', () => ({
  __esModule: true,
  ...jest.requireActual('@/services/api'),
  apiClient: {
    get: jest.fn(),
  },
}));
describe('GetChemists route handler', () => {
  const mockDataResponse: ChemistsResponse & { error?: string } = {
    data: MOCK_CHEMISTS_LIST,
    meta: {},
    error: undefined,
  };

  let mockDataRequest: NextRequest;

  beforeEach(() => {
    mockDataRequest = new NextRequest(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.CHEMISTS.GET_CHEMISTS}`,
      {
        headers: {
          Authorization: 'Bearer mock',
        },
      },
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the chemist list', async () => {
    jest.spyOn(apiClient, 'get').mockResolvedValueOnce(mockDataResponse);

    const response = await GET(mockDataRequest);

    const result: ChemistsResponse & { error?: string } = await response.json();

    expect(result).toEqual(mockDataResponse);
  });

  it('should return the error when there is an exception', async () => {
    const mockDataResponse: ChemistsResponse & { error?: string } = {
      data: MOCK_CHEMISTS_LIST,
      meta: {},
      error: 'mock',
    };

    jest.spyOn(apiClient, 'get').mockResolvedValueOnce(mockDataResponse);

    const response = await GET(mockDataRequest);

    const result: ChemistsResponse & { error?: string } = await response.json();

    expect(result).toEqual(mockDataResponse);
  });

  it('should return the error if bearer token is empty', async () => {
    const mockDataResponse: {
      data: ChemistResponse[] | null;
      error?: string;
    } = {
      data: null,
      error: SERVER_ERROR_MESSAGES[403],
    };

    jest.spyOn(apiClient, 'get').mockResolvedValueOnce(mockDataResponse);

    mockDataRequest = new NextRequest(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.CHEMISTS.GET_CHEMISTS}`,
      {
        headers: undefined,
      },
    );

    const response = await GET(mockDataRequest);

    const result: ChemistsResponse & { error?: string } = await response.json();

    expect(result).toEqual(mockDataResponse);
  });
});
