'use server';

// Services
import { addAppointment, updateAppointment } from '@/services';

// Types
import { AppointmentPayload, AppointmentResponse } from '@/types';

export const createAppointment = async (
  appointment: AppointmentPayload,
): Promise<AppointmentResponse | string> => await addAppointment(appointment);

export const editAppointment = async (
  id: string,
  appointment: AppointmentPayload,
): Promise<AppointmentResponse | string> =>
  await updateAppointment(id, appointment);
