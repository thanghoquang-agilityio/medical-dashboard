'use client';

import dynamic from 'next/dynamic';

// Components
import { Button, Select, Text } from '@/components/ui';
import { MoreIcon } from '@/icons';

// Constants
import { APPOINTMENT_STATUS_OPTIONS } from '@/constants';

// Types
import {
  AppointmentModel,
  AppointmentResponse,
  ColumnType,
  MetaResponse,
} from '@/types';

// Utils
import { formatDate, formatTimeAppointment } from '@/utils';

const DataGrid = dynamic(() => import('@/components/ui/DataGrid'));

interface AppointmentProps extends MetaResponse {
  appointments: AppointmentResponse[];
}
const AppointmentList = ({ appointments }: AppointmentProps) => {
  const COLUMNS_APPOINTMENT: ColumnType<AppointmentModel>[] = [
    {
      key: 'startTime',
      title: '',
      customNode: (_, item) => {
        const date = formatDate(item.startTime);
        return (
          <div className="rounded-md w-[37px] h-10 bg-background-100 text-center pt-1">
            <Text customClass="text-xs text-yellow font-bold">
              {date.dayOfWeek}
            </Text>
            <Text variant="primary" customClass="text-xs">
              {date.dayOfMonth}
            </Text>
          </div>
        );
      },
    },
    {
      key: 'receiverId',
      title: '',
      customNode: (_, item) => (
        <>
          <Text variant="primary" size="sm">
            {item.receiverId.data.attributes.username}
          </Text>
          <Text customClass="text-primary-300 font-light" size="xs">
            {formatTimeAppointment({
              start: item.startTime,
              duration: item.durationTime,
            })}
          </Text>
        </>
      ),
    },
    {
      key: 'more',
      title: '',
      customNode: () => (
        <div className="flex justify-end">
          <Button
            color="stone"
            className="p-0h-[26px] min-w-[26px] bg-background-100 rounded-md"
          >
            <MoreIcon customClass="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-medium max-w-[420px] py-3 bg-background-200 shadow-lg">
      <div className="flex justify-between pb-5 items-center px-3">
        <Text customClass="text-lg font-bold text-primary-100">
          Appointments
        </Text>
        <div>
          <Select
            options={APPOINTMENT_STATUS_OPTIONS}
            defaultSelectedKeys={APPOINTMENT_STATUS_OPTIONS[0].key}
            placeholder="Status"
            classNames={{
              mainWrapper: 'w-[107px] max-h-[36px] text-xs',
            }}
          />
        </div>
      </div>

      <DataGrid
        data={appointments}
        columns={COLUMNS_APPOINTMENT as ColumnType<unknown>[]}
        classWrapper="p-0"
      />
    </div>
  );
};

export default AppointmentList;
