'use client';

import dynamic from 'next/dynamic';
import { memo } from 'react';
import { Card } from '@nextui-org/react';

// Types
import {
  AppointmentModel,
  AppointmentResponse,
  ColumnType,
  MetaResponse,
  STATUS_TYPE_RESPONSE,
} from '@/types';

// Utils
import { formatDayMonthYear, formatTimeAppointment } from '@/utils';
import { APPOINTMENT_STATUS_OPTIONS, ROLE } from '@/constants';

// Components
import { Avatar, Select, Status, Text } from '@/components/ui';
const DataGrid = dynamic(() => import('@/components/ui/DataGrid'));

// Create config columns for appointments
const createColumns = (role: string): ColumnType<AppointmentModel>[] => {
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

  return role === ROLE.USER ? baseColumns.slice(1) : baseColumns;
};

interface AppointmentListProps extends MetaResponse {
  appointments: AppointmentResponse[];
  role: string;
}

const AppointmentList = ({
  appointments,
  pagination,
  role,
}: AppointmentListProps) => {
  const columns = createColumns(role);

  return (
    <Card className="w-full px-4 py-6 bg-background-200">
      <div className="flex justify-between items-center">
        <Text customClass="text-xl font-bold text-primary-100">History</Text>
        <div>
          <Select
            options={APPOINTMENT_STATUS_OPTIONS}
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
      <div className="flex flex-col items-center">
        <DataGrid
          data={appointments}
          columns={columns as ColumnType<unknown>[]}
          pagination={pagination}
          hasDivider
        />
      </div>
    </Card>
  );
};

export default memo(AppointmentList);
