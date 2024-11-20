import { AppointmentModel, AppointmentStatusOption } from '@/types';
import { DEFAULT_CHEMIST_DATA } from './chemist';

export const APPOINTMENT_STATUS_OPTIONS: AppointmentStatusOption[] = [
  {
    key: 'new',
    label: 'New',
    value: 0,
  },
  {
    key: 'meeting',
    label: 'Meeting',
    value: 1,
  },
  {
    key: 'cancelled',
    label: 'Cancelled',
    value: 2,
  },
];

export const APPOINTMENT_STATUS = [
  {
    key: '0',
    label: 'New',
  },
  {
    key: '1',
    label: 'Meeting',
  },
  {
    key: '2',
    label: 'Canceled',
  },
];

export const DEFAULT_APPOINTMENT_DATA: AppointmentModel = {
  startTime: '',
  durationTime: '',
  status: 0,
  receiverId: {
    data: {
      id: '',
      attributes: DEFAULT_CHEMIST_DATA,
    },
  },
  senderId: {
    data: {
      id: '',
      attributes: DEFAULT_CHEMIST_DATA,
    },
  },
};

export const APPOINTMENT_SEARCH_PARAMS = ['receiverId', 'senderId'] as const;
