'use server';
import { revalidateTag } from 'next/cache';

// Types
import {
  ChemistDataResponse,
  ChemistPayload,
  ChemistResponse,
  ChemistsDataResponse,
  ChemistsResponse,
  ErrorResponse,
  FetchDataProps,
} from '@/types';

// Services
import { apiClient } from './api';

// Constants
import { API_ENDPOINT } from '@/constants';

export const addUserToChemists = async (
  payload: ChemistPayload,
): Promise<ChemistDataResponse> => {
  try {
    const { data, error } = await apiClient.post<{
      data: ChemistResponse;
      error?: string;
    }>(`${API_ENDPOINT.CHEMISTS}`, {
      body: {
        data: payload,
      },
    });

    if (error) {
      return {
        chemist: null,
        error: (JSON.parse(error) as ErrorResponse).error.message,
      };
    }

    revalidateTag(API_ENDPOINT.CHEMISTS);

    return { chemist: data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred when adding user to chemists';

    return { chemist: null, error: errorMessage };
  }
};

export const getChemists = async ({
  searchParams = new URLSearchParams(),
  options = { next: { tags: [API_ENDPOINT.CHEMISTS] } },
}: FetchDataProps): ChemistsDataResponse => {
  try {
    const api = await apiClient.apiClientSession();
    const url = decodeURIComponent(
      `${API_ENDPOINT.CHEMISTS}?${searchParams.toString()}`,
    );

    const { data, meta, error } = await api.get<
      ChemistsResponse & { error?: string }
    >(url, {
      ...options,
      next: {
        ...options.next,
        revalidate: 3600,
      },
    });

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return { chemists: [], error: errorResponse.error.message };
    }

    return {
      chemists: data,
      ...meta,
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request get chemists';

    return { chemists: [], error: errorMessage };
  }
};
