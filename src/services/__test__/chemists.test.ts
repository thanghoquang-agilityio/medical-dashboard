import { MOCK_CHEMISTS_LIST } from '@/mocks';
import { ApiClient, apiClient } from '../api';
import { addUserToChemists, getChemists } from '../chemists';
import { API_ENDPOINT, EXCEPTION_ERROR_MESSAGE } from '@/constants';

jest.mock('next/cache');
describe('Chemist services test cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockGet = jest.fn();
  const mockPost = jest.spyOn(apiClient, 'post');

  it('should return a list of chemists when getting chemist list', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      get: mockGet.mockResolvedValue({
        data: MOCK_CHEMISTS_LIST,
        meta: {},
        error: null,
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await getChemists({});

    expect(result).toEqual({
      chemists: MOCK_CHEMISTS_LIST,
      error: null,
    });

    expect(mockGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.CHEMISTS}?`,
      expect.anything(),
    );
  });

  it('should return error message when there are errors during getting chemist list', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      get: mockGet.mockResolvedValue({
        data: [],
        meta: {},
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as Partial<ApiClient> as ApiClient);

    const result = await getChemists({});

    expect(result).toEqual({
      chemists: [],
      error: 'Something went wrong',
    });

    expect(mockGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.CHEMISTS}?`,
      expect.anything(),
    );
  });

  it('should handle error exception when getting chemist list', async () => {
    const api = jest.spyOn(apiClient, 'apiClientSession');

    api.mockResolvedValueOnce({
      get: mockGet.mockRejectedValueOnce(new Error('Mock error exception')),
    } as Partial<ApiClient> as ApiClient);

    let result = await getChemists({});

    expect(result).toEqual({
      chemists: [],
      error: 'Mock error exception',
    });

    api.mockResolvedValueOnce({
      get: jest.fn().mockRejectedValueOnce({}),
    } as Partial<ApiClient> as ApiClient);

    result = await getChemists({});

    expect(result).toEqual({
      chemists: [],
      error: EXCEPTION_ERROR_MESSAGE.GET('chemists'),
    });

    expect(mockGet).toHaveBeenCalledWith(
      `${API_ENDPOINT.CHEMISTS}?`,
      expect.anything(),
    );
  });

  it('should return chemist when adding user to chemists', async () => {
    mockPost.mockResolvedValueOnce({
      data: MOCK_CHEMISTS_LIST[0],
      error: null,
    });

    const result = await addUserToChemists({
      users_permissions_user: 'Alex Stanton',
    });

    expect(result).toEqual({
      chemist: MOCK_CHEMISTS_LIST[0],
      error: null,
    });

    expect(mockPost).toHaveBeenCalledWith(`${API_ENDPOINT.CHEMISTS}`, {
      body: {
        data: {
          users_permissions_user:
            MOCK_CHEMISTS_LIST[0].attributes.users_permissions_user.data
              .attributes.username,
        },
      },
    });
  });

  it('should return error message when there are errors during adding user to chemists', async () => {
    mockPost.mockResolvedValueOnce({
      data: null,
      error: JSON.stringify({
        error: {
          message: 'Something went wrong',
        },
      }),
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
    mockPost.mockRejectedValueOnce(new Error('Mock error exception'));

    let result = await addUserToChemists({
      users_permissions_user: 'Alex Stanton',
    });

    expect(result).toEqual({
      chemist: null,
      error: 'Mock error exception',
    });

    mockPost.mockRejectedValueOnce({});

    result = await addUserToChemists({
      users_permissions_user: 'Alex Stanton',
    });

    expect(result).toEqual({
      chemist: null,
      error: EXCEPTION_ERROR_MESSAGE.ADD('user to chemists'),
    });

    expect(mockPost).toHaveBeenCalledWith(`${API_ENDPOINT.CHEMISTS}`, {
      body: {
        data: {
          users_permissions_user:
            MOCK_CHEMISTS_LIST[0].attributes.users_permissions_user.data
              .attributes.username,
        },
      },
    });
  });
});
