// Types
import { ChemistPayload, ChemistResponse, ErrorResponse } from '@/types';

// Services
import { apiClient } from './api';
import { API_ENDPOINT } from '@/constants';

export const addUserToChemists = async (
  payload: ChemistPayload,
): Promise<ChemistResponse> => {
  try {
    const { error } = await apiClient.post<ChemistResponse>(
      `${API_ENDPOINT.CHEMISTS}`,
      {
        body: {
          data: payload,
        },
      },
    );

    if (error) {
      return { error: (JSON.parse(error) as ErrorResponse).error.message };
    }

    return { error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred when adding user to chemists';

    return { error: errorMessage };
  }
};
