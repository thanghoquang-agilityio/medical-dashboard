/**
 * @jest-environment node
 */
import { MOCK_CHEMISTS_LIST } from '@/mocks';
import { POST } from '../route';
import { ChemistDataResponse, ChemistPayload } from '@/types';
import { LOCAL_HOST, ROUTE_ENDPOINT } from '@/constants';
import { addUserToChemists } from '@/services';

jest.mock('@/services', () => ({
  addUserToChemists: jest.fn(),
}));
describe('AddToChemists route handler', () => {
  const mockRequestData: ChemistPayload = {
    users_permissions_user: '8',
  };

  let mockRequest: Request;

  const mockAddUserToChemists = addUserToChemists as jest.Mock;

  beforeEach(() => {
    mockRequest = new Request(
      `${LOCAL_HOST}/${ROUTE_ENDPOINT.CHEMISTS.ADD_TO_CHEMISTS}`,
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
    mockAddUserToChemists.mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });

  it('should return the error when there is an exception', async () => {
    const mockResponse: ChemistDataResponse = {
      chemist: null,
      error: 'mock',
    };

    mockAddUserToChemists.mockResolvedValueOnce(mockResponse);

    const response = await POST(mockRequest);

    const result = await response.json();

    expect(result).toEqual(mockResponse);
  });
});