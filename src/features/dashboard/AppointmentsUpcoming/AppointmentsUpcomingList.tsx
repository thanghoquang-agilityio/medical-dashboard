'use client';

import dynamic from 'next/dynamic';
import { Card } from '@nextui-org/react';

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

interface AppointmentsUpcomingProps extends MetaResponse {
  appointments: AppointmentResponse[];
}
const AppointmentsUpcomingList = ({
  appointments,
}: AppointmentsUpcomingProps) => {
  const COLUMNS_APPOINTMENT: ColumnType<AppointmentModel>[] = [
    {
      key: 'startTime',
      title: '',
      customNode: (_, item) => {
        const date = formatDate(item.startTime);
        return (
          <div className="rounded-md w-[30px] md:w-[37px] h-10 bg-background-100 text-center pt-1">
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
          <Text variant="primary" customClass="text-xs md:text-sm">
            {item.receiverId.data.attributes.username}
          </Text>
          <Text
            customClass="text-primary-300 font-light hidden lg:block"
            size="xs"
          >
            {formatTimeAppointment({
              start: item.startTime,
              duration: item.durationTime,
            })}
          </Text>
        </>
      ),
    },
    {
      key: 'durationTime',
      title: '',
      customNode: (_, item) => (
        <Text customClass="text-primary-300 font-light lg:hidden" size="xs">
          {formatTimeAppointment({
            start: item.startTime,
            duration: item.durationTime,
          })}
        </Text>
      ),
    },
    {
      key: 'more',
      title: '',
      customNode: () => (
        <div className="flex justify-end mr-1">
          <Button
            color="stone"
            className="p-0 min-w-4 h-4 md:h-[26px] md:min-w-[26px] bg-background-100 rounded-md"
          >
            <MoreIcon customClass=" w-[11px] h-[11px] md:w-4 md:h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card className="w-full lg:max-w-[320px] max-h-[236px] p-4 pl-5 bg-background-200">
      <div className="flex justify-between items-center">
        <Text customClass="text-lg font-bold text-primary-100">
          Appointments
        </Text>
        <div>
          <Select
            options={APPOINTMENT_STATUS_OPTIONS}
            defaultSelectedKeys={APPOINTMENT_STATUS_OPTIONS[0].key}
            placeholder="Status"
            classNames={{
              base: 'max-w-[102px] max-h-[36px]',
              mainWrapper: 'max-w-[102px] max-h-[36px]',
              innerWrapper: 'w-[80px]',
              trigger: 'min-h-[36px]',
            }}
          />
        </div>
      </div>

      <DataGrid
        data={appointments}
        columns={COLUMNS_APPOINTMENT as ColumnType<unknown>[]}
        classWrapper="pt-4"
        classCell="pb-4"
      />
    </Card>
  );
};

export default AppointmentsUpcomingList;
