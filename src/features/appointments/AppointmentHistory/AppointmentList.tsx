'use client';

import dynamic from 'next/dynamic';
import {
  ChangeEvent,
  memo,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { Card } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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

// Constants
import { API_IMAGE_URL, APPOINTMENT_STATUS_OPTIONS, ROLE } from '@/constants';

// Components
import { Avatar, Select, Spinner, Status, Text } from '@/components/ui';
const DataGrid = dynamic(() => import('@/components/ui/DataGrid'));

// Create config columns for appointments
const createColumns = (role: string): ColumnType<AppointmentModel>[] => {
  const baseColumns: ColumnType<AppointmentModel>[] = [
    {
      key: 'senderId',
      title: '',
      customNode: (_, item) => {
        const { url = '' } =
          item.senderId.data.attributes.avatar?.data?.attributes || {};

        return (
          <div className="flex gap-2 items-center">
            <Avatar
              src={`${API_IMAGE_URL}${url}`}
              size="md"
              isBordered
              className="shrink-0"
            />
            <Text variant="primary" size="sm">
              {item.senderId.data.attributes.username}
            </Text>
          </div>
        );
      },
    },
    {
      key: 'receiverId',
      title: '',
      customNode: (_, item) => {
        const { url = '' } =
          item.receiverId.data.attributes.avatar?.data?.attributes || {};

        return (
          <div className="flex gap-2 items-center">
            <Avatar
              src={`${API_IMAGE_URL}${url}`}
              size="md"
              isBordered
              className="shrink-0"
            />
            <Text variant="primary" size="sm">
              {item.receiverId.data.attributes.username}
            </Text>
          </div>
        );
      },
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
  defaultStatus: string;
}

const AppointmentList = ({
  appointments,
  pagination,
  role,
  defaultStatus,
}: AppointmentListProps) => {
  const columns = createColumns(role);

  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(new Set<string>([defaultStatus]));

  const searchParams = useSearchParams() ?? '';
  const pathname = usePathname() ?? '';
  const router = useRouter();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const handleReplaceURL = useCallback(
    (params: URLSearchParams) => {
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router],
  );

  const updateSearchParams = useCallback(
    (value: string) => {
      if (!searchParams.get('status')) {
        params.append('status', value);
      } else {
        params.set('status', value);
      }

      handleReplaceURL?.(params);
    },
    [handleReplaceURL, params, searchParams],
  );

  const handleSelectStatus = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setStatus(new Set([e.target.value]));
      updateSearchParams(e.target.value);
    },
    [updateSearchParams],
  );

  return (
    <Card className="w-full px-4 py-6 bg-background-200">
      <div className="flex justify-between items-center">
        <Text customClass="text-xl font-bold text-primary-100">History</Text>
        <div>
          <Select
            aria-label="Status"
            options={APPOINTMENT_STATUS_OPTIONS}
            selectedKeys={status}
            defaultSelectedKeys={APPOINTMENT_STATUS_OPTIONS[0].key}
            placeholder="Status"
            classNames={{
              base: 'max-w-[102px] max-h-[36px]',
              mainWrapper: 'max-w-[102px] max-h-[36px]',
              innerWrapper: 'w-[80px]',
              trigger: 'min-h-[36px]',
            }}
            onChange={handleSelectStatus}
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        {isPending ? (
          <Spinner size="sm" />
        ) : (
          <DataGrid
            data={appointments}
            columns={columns as ColumnType<unknown>[]}
            pagination={pagination}
            hasDivider
          />
        )}
      </div>
    </Card>
  );
};

export default memo(AppointmentList);
