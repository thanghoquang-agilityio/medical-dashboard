import { auth } from '@/config/auth';
import {
  API_ENDPOINT,
  EXCEPTION_ERROR_MESSAGE,
  HOST_DOMAIN,
  ROUTE_ENDPOINT,
} from '@/constants';
import { ErrorResponse, FetchDataProps, TransferDataResponse } from '@/types';

export const getTransferHistory = async ({
  searchParams = new URLSearchParams(),
  options = { next: { tags: [API_ENDPOINT.TRANSFERS] } },
}: FetchDataProps): Promise<TransferDataResponse> => {
  try {
    const params = new URLSearchParams(searchParams);

    const { token = '' } = (await auth())?.user || {};

    const url = `${HOST_DOMAIN}/${ROUTE_ENDPOINT.TRANSFER.GET_TRANSFERS}?${decodeURIComponent(params.toString())}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data, error }: TransferDataResponse = await response.json();

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return { data: [], error: errorResponse.error.message };
    }

    return {
      data,
      meta: {},
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.GET('transfers');

    return { data: [], error: errorMessage };
  }
};
