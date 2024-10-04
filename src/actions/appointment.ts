'use server';

// Services
import {
  addAppointment as addAppointmentService,
  updateAppointment as updateAppointmentService,
  deleteAppointment as deleteAppointmentService,
} from '@/services';

// Types
import { AppointmentDataResponse, AppointmentPayload } from '@/types';

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
