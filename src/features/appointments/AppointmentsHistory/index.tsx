'use client';

import dynamic from 'next/dynamic';
import {
  ChangeEvent,
  Key,
  memo,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { Card, useDisclosure } from '@nextui-org/react';
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
import {
  Avatar,
  Button,
  InputSearch,
  Select,
  Status,
  Text,
} from '@/components/ui';
import { AppointmentsHistoryListSkeleton } from './AppointmentsHistorySkeleton';
import AppointmentModal from '../AppointmentModal';
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

  return role === ROLE.ADMIN ? baseColumns : baseColumns.slice(1);
};

export interface AppointmentsHistoryProps extends MetaResponse {
  userId: string;
  appointments: AppointmentResponse[];
  role: string;
  defaultStatus?: string;
}

const AppointmentsHistory = ({
  userId,
  appointments,
  pagination,
  role,
  defaultStatus = '',
}: AppointmentsHistoryProps) => {
  const columns = createColumns(role);

  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(new Set<string>([defaultStatus]));
  const [appointment, setAppointment] = useState<
    AppointmentModel | undefined
  >();
  const [appointmentId, setAppointmentId] = useState<string | undefined>();

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
      const status = searchParams.get('status');

      if (!status) {
        params.append('status', value);
      } else if (value) {
        params.set('status', value);
      } else {
        params.delete('status');
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

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleEdit = useCallback(
    (key: Key) => {
      const appointment = appointments.find(
        (appointment) => key == appointment.id,
      );
      setAppointment(appointment?.attributes);
      setAppointmentId(appointment?.id);
      onOpen();
    },
    [appointments, onOpen],
  );

  const handleCreate = useCallback(() => {
    setAppointment(undefined);
    onOpen();
  }, [onOpen]);

  return (
    <>
      <div className="flex justify-between gap-10">
        <InputSearch
          placeholder="Search Appointments"
          classNames={{ mainWrapper: 'pb-10' }}
        />
        <Button onClick={handleCreate} className="mt-3 h-[50px]">
          Create
        </Button>
      </div>
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
            <AppointmentsHistoryListSkeleton />
          ) : (
            <DataGrid
              data={appointments}
              startTransition={startTransition}
              columns={columns as ColumnType<unknown>[]}
              pagination={pagination}
              hasDivider
              classWrapper="p-1"
              onRowAction={handleEdit}
            />
          )}
        </div>
      </Card>
      <AppointmentModal
        data={appointment}
        appointmentId={appointmentId}
        userId={userId}
        role={role}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default memo(AppointmentsHistory);
