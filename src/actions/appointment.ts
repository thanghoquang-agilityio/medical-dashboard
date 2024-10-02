'use server';

// Services
import { addAppointment, updateAppointment } from '@/services';

// Types
import { AppointmentDataResponse, AppointmentPayload } from '@/types';

export const createAppointment = async (
  appointment: AppointmentPayload,
): Promise<AppointmentDataResponse> => await addAppointment(appointment);

export const editAppointment = async (
  id: string,
  appointment: AppointmentPayload,
): Promise<AppointmentDataResponse> => await updateAppointment(id, appointment);
