'use server';

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
  ErrorResponse,
} from '@/types';

// Services
import { apiClient } from '@/services';

export const getAppointments = async ({
  searchParams = new URLSearchParams(),
  options = { next: { tags: [API_ENDPOINT.APPOINTMENTS] } },
}: FetchDataProps): AppointmentsDataResponse => {
  try {
    const api = await apiClient.apiClientSession();
    const url = decodeURIComponent(
      `${API_ENDPOINT.APPOINTMENTS}?${searchParams.toString()}`,
    );
    const { data, meta } = await api.get<AppointmentsResponse>(url, {
      ...options,
      next: {
        ...options.next,
        revalidate: 3600,
      },
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
    const api = await apiClient.apiClientSession();
    const { data, error } = await api.post<{
      data: AppointmentResponse;
      error?: string;
    }>(`${API_ENDPOINT.APPOINTMENTS}`, {
      body: {
        data: appointment,
      },
    });

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return errorResponse.error.message;
    }

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
    const api = await apiClient.apiClientSession();
    const { data, error } = await api.put<{
      data: AppointmentResponse;
      error?: string;
    }>(`${API_ENDPOINT.APPOINTMENTS}/${id}`, {
      body: {
        data: {
          ...appointment,
        },
      },
    });

    if (error) {
      const errorResponse = JSON.parse(error) as ErrorResponse;
      return errorResponse.error.message;
    }

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
    const api = await apiClient.apiClientSession();
    const response = await api.delete<APIRelatedResponse<AppointmentResponse>>(
      `${API_ENDPOINT.APPOINTMENTS}/${id}`,
    );
    if (response.data) {
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
