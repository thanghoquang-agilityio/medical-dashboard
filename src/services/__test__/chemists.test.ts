import { MOCK_CHEMISTS_LIST } from '@/mocks';
import { addUserToChemists, getChemists } from '../chemists';
import { EXCEPTION_ERROR_MESSAGE } from '@/constants';

jest.mock('next/cache');
jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    auth: jest.fn(),
  }),
}));
describe('Chemist services test cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockFetch = jest.fn();

  global.fetch = mockFetch;

  it('should return a list of chemists when getting chemist list', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          data: MOCK_CHEMISTS_LIST,
          meta: {},
          error: null,
        }),
    });

    const result = await getChemists({});

    expect(result).toEqual({
      chemists: MOCK_CHEMISTS_LIST,
      error: null,
    });
  });

  it('should return error message when there are errors during getting chemist list', async () => {
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

    const result = await getChemists({});

    expect(result).toEqual({
      chemists: [],
      error: 'Something went wrong',
    });
  });

  it('should handle error exception when getting chemist list', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('Mock error exception')),
    });

    let result = await getChemists({});

    expect(result).toEqual({
      chemists: [],
      error: 'Mock error exception',
    });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject({}),
    });

    result = await getChemists({});

    expect(result).toEqual({
      chemists: [],
      error: EXCEPTION_ERROR_MESSAGE.GET('chemists'),
    });
  });

  it('should return chemist when adding user to chemists', async () => {
    const response = {
      data: MOCK_CHEMISTS_LIST[0],
      error: null,
    };
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(response),
    });

    const result = await addUserToChemists({
      users_permissions_user: 'Alex Stanton',
    });

    expect(result).toEqual({
      chemist: MOCK_CHEMISTS_LIST[0],
      error: null,
    });
  });

  it('should return error message when there are errors during adding user to chemists', async () => {
    const response = {
      data: null,
      error: JSON.stringify({
        error: {
          message: 'Something went wrong',
        },
      }),
    };

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(response),
    });

    const result = await addUserToChemists({
      users_permissions_user: 'Alex Stanton',
    });

    expect(result).toEqual({
      chemist: null,
      error: 'Something went wrong',
    });
  });

  it('should handle error exception when adding user to chemist list', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('Mock error exception')),
    });

    let result = await addUserToChemists({
      users_permissions_user: 'Alex Stanton',
    });

    expect(result).toEqual({
      chemist: null,
      error: 'Mock error exception',
    });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject({}),
    });

    result = await addUserToChemists({
      users_permissions_user: 'Alex Stanton',
    });

    expect(result).toEqual({
      chemist: null,
      error: EXCEPTION_ERROR_MESSAGE.ADD('user to chemists'),
    });
  });
});
