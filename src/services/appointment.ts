import { revalidateTag } from 'next/cache';

// Constants
import {
  API_ENDPOINT,
  EXCEPTION_ERROR_MESSAGE,
  HOST_DOMAIN,
  ROUTE_ENDPOINT,
} from '@/constants';

// Types
import {
  AppointmentsResponse,
  AppointmentsDataResponse,
  FetchDataProps,
  AppointmentPayload,
  AppointmentResponse,
  ErrorResponse,
  AppointmentDataResponse,
} from '@/types';

// Services
import { apiClient } from '@/services';
import { auth } from '@/config/auth';

export const getAppointments = async ({
  searchParams = new URLSearchParams(),
  options = { next: { tags: [API_ENDPOINT.APPOINTMENTS] } },
}: FetchDataProps): AppointmentsDataResponse => {
  try {
    const params = new URLSearchParams(searchParams);

    const { token = '' } = (await auth())?.user || {};

    const url = `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.GET_APPOINTMENTS}?${params.toString()}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data, meta, error }: AppointmentsResponse & { error?: string } =
      await response.json();

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return { appointments: [], error: errorResponse.error.message };
    }

    return {
      appointments: data,
      ...meta,
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.GET('appointments');

    return { appointments: [], error: errorMessage };
  }
};

export const addAppointment = async (
  appointment: AppointmentPayload,
): Promise<AppointmentDataResponse> => {
  try {
    const { token = '' } = (await auth())?.user || {};

    const url = `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.ADD_APPOINTMENT}`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        data: appointment,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const {
      data,
      error,
    }: {
      data: AppointmentResponse;
      error?: string;
    } = await response.json();

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return { appointment: null, error: errorResponse.error.message };
    }

    revalidateTag(`${API_ENDPOINT.APPOINTMENTS}/dashboard`);
    revalidateTag(API_ENDPOINT.APPOINTMENTS);

    return { appointment: data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.ADD('appointment');

    return { appointment: null, error: errorMessage };
  }
};

export const updateAppointment = async (
  id: string,
  appointment: AppointmentPayload,
): Promise<AppointmentDataResponse> => {
  try {
    const { token = '' } = (await auth())?.user || {};

    const url = `${HOST_DOMAIN}/${ROUTE_ENDPOINT.APPOINTMENTS.UPDATE_APPOINTMENT}/${id}`;

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        data: appointment,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const {
      data,
      error,
    }: {
      data: AppointmentResponse;
      error?: string;
    } = await response.json();

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return { appointment: null, error: errorResponse.error.message };
    }

    revalidateTag(`${API_ENDPOINT.APPOINTMENTS}/dashboard`);
    revalidateTag(API_ENDPOINT.APPOINTMENTS);

    return { appointment: data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.UPDATE('appointment');

    return { appointment: null, error: errorMessage };
  }
};

export const deleteAppointment = async (
  id: string,
): Promise<AppointmentDataResponse> => {
  try {
    const api = await apiClient.apiClientSession();
    const { data, error } = await api.delete<{
      data: AppointmentResponse;
      error?: string;
    }>(`${API_ENDPOINT.APPOINTMENTS}/${id}`);

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return { appointment: null, error: errorResponse.error.message };
    }

    revalidateTag(`${API_ENDPOINT.APPOINTMENTS}/dashboard`);
    revalidateTag(API_ENDPOINT.APPOINTMENTS);

    return { appointment: data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : EXCEPTION_ERROR_MESSAGE.DELETE('appointment');

    return { appointment: null, error: errorMessage };
  }
};
