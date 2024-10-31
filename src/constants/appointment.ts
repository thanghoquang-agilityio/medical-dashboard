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

export const DURATION_TIME_OPTIONS = [
  {
    key: '60',
    label: '1 hours',
  },
  {
    key: '120',
    label: '2 hours',
  },
  {
    key: '180',
    label: '3 hours',
  },
  {
    key: '240',
    label: '4 hours',
  },
  {
    key: '300',
    label: '5 hours',
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
