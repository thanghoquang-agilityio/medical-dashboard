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

export type AppointmentsDataResponse = Promise<
  { appointments: AppointmentResponse[]; error?: Error } & MetaResponse
>;

export type AppointmentsResponse = {
  data: AppointmentResponse[];
  meta: MetaResponse;
};

export type AppointmentPayload = Omit<
  AppointmentModel,
  'senderId' | 'receiverId'
> & {
  senderId: number;
  receiverId: number;
};

export type AppointMentFormData = Omit<AppointmentPayload, 'status'> & {
  startDate: string;
  status: string;
};
