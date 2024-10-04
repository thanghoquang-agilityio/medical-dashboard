import {
  APIRelatedResponse,
  APIResponse,
  MetaResponse,
  UserModel,
} from '@/types';

export type AppointmentStatus = 0 | 1 | 2 | 3;

export interface AppointmentStatusOption {
  key: string;
  label: string;
  value: AppointmentStatus;
}

export interface AppointmentModel {
  startTime: string;
  durationTime: string;
  status: AppointmentStatus;
  senderId: APIRelatedResponse<APIResponse<UserModel>>;
  receiverId: APIRelatedResponse<APIResponse<UserModel>>;
}

export type AppointmentResponse = APIResponse<AppointmentModel>;

export type AppointmentDataResponse = {
  appointment: AppointmentResponse | null;
  error: string | null;
};

export type AppointmentsDataResponse = Promise<
  { appointments: AppointmentResponse[]; error: string | null } & MetaResponse
>;

export type AppointmentsResponse = {
  data: AppointmentResponse[];
  meta: MetaResponse;
};

export type AppointmentPayload = Partial<
  Omit<AppointmentModel, 'senderId' | 'receiverId'>
> & {
  senderId?: string;
  receiverId?: string;
};
