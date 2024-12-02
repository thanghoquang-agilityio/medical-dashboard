import { MOCK_SPECIALTIES } from '@/mocks';
import { getSpecialties } from '../specialty';
import { EXCEPTION_ERROR_MESSAGE } from '@/constants';

describe('Specialty service test cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockFetch = jest.fn();

  global.fetch = mockFetch;
  it('should return the list of specialty', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          data: MOCK_SPECIALTIES,
          meta: {},
          error: null,
        }),
    });

    const result = await getSpecialties({});

    expect(result).toEqual({
      specialties: MOCK_SPECIALTIES,
      error: null,
    });
  });

  it('should return error message when there are errors during getting specialty list', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          data: [],
          meta: {},
          error: JSON.stringify({
            error: {
              message: 'Something went wrong',
            },
          }),
        }),
    });

    const result = await getSpecialties({});

    expect(result).toEqual({
      specialties: [],
      error: 'Something went wrong',
    });
  });

  it('should handle error exception when getting specialty list', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('Mock error exception')),
    });

    let result = await getSpecialties({});

    expect(result).toEqual({
      specialties: [],
      error: 'Mock error exception',
    });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject({}),
    });

    result = await getSpecialties({});

    expect(result).toEqual({
      specialties: [],
      error: EXCEPTION_ERROR_MESSAGE.GET('specialties'),
    });
  });
});
