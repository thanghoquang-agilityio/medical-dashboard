'use client';

import dynamic from 'next/dynamic';
import { memo } from 'react';
import { Card } from '@nextui-org/react';

// Components
import { Avatar, Select, Status, Text } from '@/components/ui';

// Types
import {
  AppointmentModel,
  AppointmentResponse,
  ColumnType,
  MetaResponse,
  ROLE,
  STATUS_TYPE_RESPONSE,
} from '@/types';

// Utils
import { formatDayMonthYear, formatTimeAppointment } from '@/utils';
import { APPOINTMENT_STATUS_OPTIONS } from '@/constants';

// Lazy load DataGrid
const DataGrid = dynamic(() => import('@/components/ui/DataGrid'));

interface AppointmentListProps extends MetaResponse {
  appointments: AppointmentResponse[];
  currentUserRole?: ROLE;
}

// Create config columns for appointments
const createColumns = (role: ROLE): ColumnType<AppointmentModel>[] => {
  const baseColumns: ColumnType<AppointmentModel>[] = [
    {
      key: 'senderId',
      title: '',
      customNode: (_, item) => (
        <div className="flex gap-2 items-center">
          <Avatar
            src={String(item.senderId.data.attributes.avatar)}
            size="md"
            hasBorder
            color="warning"
            className="shrink-0"
          />
          <Text variant="primary" size="sm" customClass="text-wrap">
            {item.senderId.data.attributes.username}
          </Text>
        </div>
      ),
    },
    {
      key: 'receiverId',
      title: '',
      customNode: (_, item) => (
        <div className="flex gap-2 items-center">
          <Avatar
            src={String(item.receiverId.data.attributes.avatar)}
            size="md"
            hasBorder
            color="warning"
            className="shrink-0"
          />
          <Text variant="primary" size="sm" customClass="text-wrap">
            {item.receiverId.data.attributes.username}
          </Text>
        </div>
      ),
    },
    {
      key: 'durationTime',
      title: '',
      customNode: (_, item) => (
        <Text variant="primary" size="xs">
          {formatTimeAppointment({
            start: item.startTime,
            duration: item.durationTime,
          })}
        </Text>
      ),
    },
    {
      key: 'startTime',
      title: '',
      customNode: (_, item) => {
        const date = formatDayMonthYear(item.startTime);
        return (
          <Text variant="primary" size="xs">
            {date}
          </Text>
        );
      },
    },
    {
      key: 'status',
      title: '',
      customNode: (_, item) => (
        <Status status={STATUS_TYPE_RESPONSE[item.status]} />
      ),
    },
  ];

  return role === ROLE.NORMAL_USER ? baseColumns.slice(1) : baseColumns;
};

const AppointmentList = ({
  appointments,
  currentUserRole = ROLE.NORMAL_USER,
}: AppointmentListProps) => {
  const columns = createColumns(currentUserRole);

  return (
    <Card className="w-full py-3 bg-background-200">
      <div className="flex justify-between pb-5 items-center px-3">
        <Text customClass="text-lg font-bold text-primary-100">History</Text>
        <div>
          <Select
            aria-label="Status"
            options={APPOINTMENT_STATUS_OPTIONS}
            defaultSelectedKeys={APPOINTMENT_STATUS_OPTIONS[0].key}
            placeholder="Status"
            classNames={{ mainWrapper: 'w-[107px] max-h-[36px] text-xs' }}
            isDisabled={!appointments.length}
          />
        </div>
      </div>
      <DataGrid
        data={appointments}
        columns={columns as ColumnType<unknown>[]}
        classWrapper="p-0 overflow-x-auto"
      />
    </Card>
  );
};

export default memo(AppointmentList);
