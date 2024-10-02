import {
  APIRelatedResponse,
  APIResponse,
  MetaResponse,
  STATUS_TYPE_RESPONSE,
  UserModel,
} from '@/types';

export interface AppointmentModel {
  startTime: string;
  durationTime: string;
  status: keyof typeof STATUS_TYPE_RESPONSE;
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

export type AppointmentPayload = Omit<
  AppointmentModel,
  'senderId' | 'receiverId'
> & {
  senderId: string;
  receiverId: string;
};
