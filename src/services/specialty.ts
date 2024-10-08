import { API_ENDPOINT } from '@/constants';

// Types
import {
  ErrorResponse,
  FetchDataProps,
  SpecialtiesResponse,
  SpecialtyDataResponse,
} from '@/types';
import { apiClient } from './api';

export const getSpecialties = async ({
  searchParams = new URLSearchParams(),
  options = { next: { tags: [API_ENDPOINT.CHEMISTS] } },
}: FetchDataProps): SpecialtyDataResponse => {
  try {
    const api = await apiClient.apiClientSession();
    const url = decodeURIComponent(
      `${API_ENDPOINT.CHEMISTS}?${searchParams.toString()}`,
    );

    const { data, meta, error } = await api.get<
      SpecialtiesResponse & { error?: string }
    >(url, {
      ...options,
      next: {
        ...options.next,
        revalidate: 3600,
      },
    });

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return { specialties: [], error: errorResponse.error.message };
    }
    return {
      specialties: data,
      ...meta,
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request get specialties';

    return { specialties: [], error: errorMessage };
  }
};
