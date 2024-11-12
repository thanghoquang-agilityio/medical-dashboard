import { MOCK_SPECIALTIES } from '@/mocks';
import { apiClient } from '../api';
import { getSpecialties } from '../specialty';
import { API_ENDPOINT, EXCEPTION_ERROR_MESSAGE } from '@/constants';

describe('Specialty service test cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockGet = jest.spyOn(apiClient, 'get');
  it('should return the list of specialty', async () => {
    mockGet.mockResolvedValueOnce({
      data: MOCK_SPECIALTIES,
      meta: {},
      error: null,
    });

    const result = await getSpecialties({});

    expect(result).toEqual({
      specialties: MOCK_SPECIALTIES,
      error: null,
    });

    expect(mockGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.SPECIALTIES}?`,
      expect.anything(),
    );
  });

  it('should return error message when there are errors during getting specialty list', async () => {
    mockGet.mockResolvedValueOnce({
      data: [],
      meta: {},
      error: JSON.stringify({
        error: {
          message: 'Something went wrong',
        },
      }),
    });

    const result = await getSpecialties({});

    expect(result).toEqual({
      specialties: [],
      error: 'Something went wrong',
    });
  });

  it('should handle error exception when getting specialty list', async () => {
    mockGet.mockRejectedValueOnce(new Error('Mock error exception'));

    let result = await getSpecialties({});

    expect(result).toEqual({
      specialties: [],
      error: 'Mock error exception',
    });

    mockGet.mockRejectedValueOnce({});

    result = await getSpecialties({});

    expect(result).toEqual({
      specialties: [],
      error: EXCEPTION_ERROR_MESSAGE.GET('specialties'),
    });
  });
});
