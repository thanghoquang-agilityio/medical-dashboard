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

// Constants
import {
  API_ENDPOINT,
  EXCEPTION_ERROR_MESSAGE,
  HOST_DOMAIN,
  ROUTE_ENDPOINT,
} from '@/constants';
import { auth } from '@/config/auth';

export const addUserToChemists = async (
  payload: ChemistPayload,
): Promise<ChemistDataResponse> => {
  try {
    const response = await fetch(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.CHEMISTS.ADD_TO_CHEMISTS}`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    );
    const {
      data,
      error,
    }: {
      data: ChemistResponse;
      error?: string;
    } = await response.json();

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
        : EXCEPTION_ERROR_MESSAGE.ADD('user to chemists');

    return { chemist: null, error: errorMessage };
  }
};

export const getChemists = async ({
  searchParams = new URLSearchParams(),
  options = { next: { tags: [API_ENDPOINT.CHEMISTS] } },
}: FetchDataProps): ChemistsDataResponse => {
  try {
    const { token = '' } = (await auth())?.user || {};

    const url = decodeURIComponent(
      `${HOST_DOMAIN}/${ROUTE_ENDPOINT.CHEMISTS.GET_CHEMISTS}?${searchParams.toString()}`,
    );

    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        ...options.next,
        revalidate: 3600,
      },
    });

    const { data, meta, error }: ChemistsResponse & { error?: string } =
      await response.json();

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
        : EXCEPTION_ERROR_MESSAGE.GET('chemists');

    return { chemists: [], error: errorMessage };
  }
};
