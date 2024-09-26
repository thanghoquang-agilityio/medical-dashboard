import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINT } from '@/constants';

// Types
import {
  AppointmentsResponse,
  AppointmentsDataResponse,
  FetchDataProps,
  AppointmentPayload,
  AppointmentResponse,
  APIRelatedResponse,
} from '@/types';

// Services
import { apiClient } from '@/services';

export const getAppointments = async ({
  searchParams = new URLSearchParams(),
  options = { next: { tags: [API_ENDPOINT.APPOINTMENTS] } },
}: FetchDataProps): AppointmentsDataResponse => {
  const api = await apiClient.apiClientSession();
  const url = decodeURIComponent(
    `${API_ENDPOINT.APPOINTMENTS}?${searchParams.toString()}`,
  );
  try {
    const { data, meta } = await api.get<AppointmentsResponse>(url, {
      ...options,
      next: { revalidate: 3600 },
    });

    return {
      appointments: data,
      ...meta,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request get appointments';

    throw new Error(errorMessage);
  }
};

export const addAppointment = async (
  appointment: AppointmentPayload,
): Promise<AppointmentResponse | string> => {
  try {
    const { data } = await apiClient.post<
      APIRelatedResponse<AppointmentResponse>
    >(`${API_ENDPOINT.APPOINTMENTS}`, {
      body: {
        data: appointment,
      },
    });

    revalidateTag(`${API_ENDPOINT.APPOINTMENTS}/dashboard`);
    revalidateTag(API_ENDPOINT.APPOINTMENTS);

    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in add appointment';

    return errorMessage;
  }
};

export const updateAppointment = async (
  id: string,
  appointment: AppointmentPayload,
): Promise<AppointmentResponse | string> => {
  try {
    const { data } = await apiClient.put<
      APIRelatedResponse<AppointmentResponse>
    >(`${API_ENDPOINT.APPOINTMENTS}/${id}`, {
      body: {
        data: {
          ...appointment,
        },
      },
    });

    revalidateTag(`${API_ENDPOINT.APPOINTMENTS}/dashboard`);
    revalidateTag(API_ENDPOINT.APPOINTMENTS);

    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in update appointment';

    return errorMessage;
  }
};

export const deleteAppointment = async (id: string) => {
  try {
    const response = await apiClient.delete<
      APIRelatedResponse<AppointmentResponse>
    >(`${API_ENDPOINT.APPOINTMENTS}/${id}`);
    if (response) {
      revalidateTag(`${API_ENDPOINT.APPOINTMENTS}/dashboard`);
      revalidateTag(API_ENDPOINT.APPOINTMENTS);

      return true;
    }

    return false;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in delete appointment';

    return errorMessage;
  }
};
