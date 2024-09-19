'use client';

import dynamic from 'next/dynamic';

// Components
import { Button, Select, Text } from '@/components/ui';
import { MoreIcon } from '@/icons';

// Mocks
import { MOCK_APPOINTMENTS } from '@/mocks';

// Constants
import { APPOINTMENT_STATUS_OPTIONS } from '@/constants';

// Types
import { AppointmentModel, ColumnType } from '@/types';

// Utils
import { formatStartTime } from '@/utils';

const DataGrid = dynamic(() => import('@/components/ui/DataGrid'));

const AppointmentList = () => {
  const COLUMNS_APPOINTMENT: ColumnType<AppointmentModel>[] = [
    {
      key: 'startTime',
      title: '',
      customNode: (_, item) => {
        const date = formatStartTime(item.startTime);
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
        <div>
          <Text variant="primary" size="sm">
            {item.receiverId.data.attributes.username}
          </Text>
          <Text customClass="text-primary-300 font-light" size="xs">
            9:00 am - 11:30 am
          </Text>
        </div>
      ),
    },
    {
      key: 'more',
      title: '',
      customNode: () => (
        <Button isIconOnly color="stone" size="tiny">
          <MoreIcon />
        </Button>
      ),
    },
  ];

  return (
    <div className="rounded-medium max-w-[420px]">
      <div className="flex justify-between pb-5 items-center">
        <Text customClass="text-lg font-bold text-primary-100">
          Appointments
        </Text>
        <div className="">
          <Select
            options={APPOINTMENT_STATUS_OPTIONS}
            defaultSelectedKeys={APPOINTMENT_STATUS_OPTIONS[0].key}
            placeholder="Appointment Status"
          />
        </div>
      </div>

      {/* TODO: will get data from API later */}
      <DataGrid
        data={MOCK_APPOINTMENTS}
        columns={COLUMNS_APPOINTMENT as ColumnType<unknown>[]}
      />
    </div>
  );
};

export default AppointmentList;
