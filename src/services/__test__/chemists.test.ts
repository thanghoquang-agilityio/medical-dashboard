import { MOCK_CHEMISTS_LIST } from '@/mocks';
import { ApiClient, apiClient } from '../api';
import { addUserToChemists, getChemists } from '../chemists';
import { ChemistResponse } from '@/types';

jest.mock('next/cache');
describe('Chemist services test cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of chemists when getting chemist list', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      get: jest.fn().mockResolvedValue({
        data: MOCK_CHEMISTS_LIST,
        meta: {},
        error: null,
      }),
    } as unknown as ApiClient);

    const result = await getChemists({});

    expect(result).toEqual({
      chemists: MOCK_CHEMISTS_LIST,
      error: null,
    });
  });

  it('should return error message when there are errors during getting chemist list', async () => {
    jest.spyOn(apiClient, 'apiClientSession').mockResolvedValueOnce({
      get: jest.fn().mockResolvedValue({
        data: [],
        meta: {},
        error: JSON.stringify({
          error: {
            message: 'Something went wrong',
          },
        }),
      }),
    } as unknown as ApiClient);

    const result = await getChemists({});

    expect(result).toEqual({
      chemists: [],
      error: 'Something went wrong',
    });
  });

  it('should handle error exception when getting chemist list', async () => {
    const api = jest.spyOn(apiClient, 'apiClientSession');

    api.mockResolvedValueOnce({
      get: jest.fn().mockRejectedValueOnce(new Error('Mock error exception')),
    } as unknown as ApiClient);

    let result = await getChemists({});

    expect(result).toEqual({
      chemists: [],
      error: 'Mock error exception',
    });

    api.mockResolvedValueOnce({
      get: jest.fn().mockRejectedValueOnce({}),
    } as unknown as ApiClient);

    result = await getChemists({});

    expect(result).toEqual({
      chemists: [],
      error: 'An unexpected error occurred in the request get chemists',
    });
  });

  it('should return chemist when adding user to chemists', async () => {
    jest.spyOn(apiClient, 'post').mockResolvedValueOnce({
      data: MOCK_CHEMISTS_LIST[0],
      error: null,
    } as unknown as ChemistResponse);

    const result = await addUserToChemists({
      users_permissions_user: 'Alex Stanton',
    });

    expect(result).toEqual({
      chemist: MOCK_CHEMISTS_LIST[0],
      error: null,
    });
  });

  it('should return error message when there are errors during adding user to chemists', async () => {
    jest.spyOn(apiClient, 'post').mockResolvedValueOnce({
      data: null,
      error: JSON.stringify({
        error: {
          message: 'Something went wrong',
        },
      }),
    } as unknown as ChemistResponse);

    const result = await addUserToChemists({
      users_permissions_user: 'Alex Stanton',
    });

    expect(result).toEqual({
      chemist: null,
      error: 'Something went wrong',
    });
  });

  it('should handle error exception when adding user to chemist list', async () => {
    const api = jest.spyOn(apiClient, 'post');

    api.mockRejectedValueOnce(new Error('Mock error exception'));

    let result = await addUserToChemists({
      users_permissions_user: 'Alex Stanton',
    });

    expect(result).toEqual({
      chemist: null,
      error: 'Mock error exception',
    });

    api.mockRejectedValueOnce({});

    result = await addUserToChemists({
      users_permissions_user: 'Alex Stanton',
    });

    expect(result).toEqual({
      chemist: null,
      error: 'An unexpected error occurred when adding user to chemists',
    });
  });
});
