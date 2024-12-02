import {
  API_ENDPOINT,
  EXCEPTION_ERROR_MESSAGE,
  HOST_DOMAIN,
  ROUTE_ENDPOINT,
} from '@/constants';

// Types
import {
  ErrorResponse,
  FetchDataProps,
  SpecialtiesResponse,
  SpecialtiesDataResponse,
} from '@/types';

export const getSpecialties = async ({
  searchParams = new URLSearchParams(),
  options = { next: { tags: [API_ENDPOINT.SPECIALTIES] } },
}: FetchDataProps): SpecialtiesDataResponse => {
  try {
    const url = decodeURIComponent(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.SPECIALTY.GET_SPECIALTIES}?${searchParams.toString()}`,
    );

    const response = await fetch(url, {
      ...options,
      next: {
        ...options.next,
        revalidate: 3600,
      },
    });

    const { data, meta, error }: SpecialtiesResponse & { error?: string } =
      await response.json();
    // const url = decodeURIComponent(
    //   `${API_ENDPOINT.SPECIALTIES}?${searchParams.toString()}`,
    // );

    // const { data, meta, error } = await apiClient.get<
    //   SpecialtiesResponse & { error?: string }
    // >(url, {
    //   ...options,
    //   next: {
    //     ...options.next,
    //     revalidate: 3600,
    //   },
    // });

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
        : EXCEPTION_ERROR_MESSAGE.GET('specialties');

    return { specialties: [], error: errorMessage };
  }
};
