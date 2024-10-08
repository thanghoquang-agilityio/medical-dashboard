'use server';

// Services
import {
  getAppointments as getAppointmentsService,
  addAppointment as addAppointmentService,
  updateAppointment as updateAppointmentService,
  deleteAppointment as deleteAppointmentService,
} from '@/services';

// Types
import {
  AppointmentDataResponse,
  AppointmentPayload,
  AppointmentsDataResponse,
  FetchDataProps,
} from '@/types';

export const getAppointments = async ({
  searchParams = new URLSearchParams(),
  options,
}: FetchDataProps): AppointmentsDataResponse => {
  const data = await getAppointmentsService({ searchParams, options });
  return data;
};

export const addAppointment = async (
  appointment: AppointmentPayload,
): Promise<AppointmentDataResponse> => await addAppointmentService(appointment);

export const updateAppointment = async (
  id: string,
  appointment: AppointmentPayload,
): Promise<AppointmentDataResponse> =>
  await updateAppointmentService(id, appointment);

export const deleteAppointment = async (
  id: string,
): Promise<AppointmentDataResponse> => await deleteAppointmentService(id);
