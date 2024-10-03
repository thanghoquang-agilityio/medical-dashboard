'use client';

import {
  ChangeEvent,
  lazy,
  memo,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@nextui-org/react';

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

// Components
import { Button, Select, Text } from '@/components/ui';
// import { MoreIcon } from '@/icons';
import { AppointmentsUpcomingListSkeleton } from './AppointmentsUpcomingSkeleton';
const DataGrid = lazy(() => import('@/components/ui/DataGrid'));

const COLUMNS_APPOINTMENT: ColumnType<AppointmentModel>[] = [
  {
    key: 'startTime',
    title: 'Start time',
    customNode: ({ item }) => {
      const { startTime = '' } = item || {};
      const date = formatDate(startTime);

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
    title: 'Receiver',
    customNode: ({ item }) => {
      const { receiverId, startTime = '', durationTime = '' } = item || {};
      const { attributes } = receiverId?.data || {};
      const { username = '' } = attributes || {};

      return (
        <>
          <Text variant="primary" customClass="text-xs md:text-sm">
            {username}
          </Text>
          <Text
            customClass="text-primary-300 font-light hidden lg:block"
            size="xs"
          >
            {formatTimeAppointment({
              start: startTime,
              duration: durationTime,
            })}
          </Text>
        </>
      );
    },
  },
  {
    key: 'durationTime',
    title: 'Duration time',
    customNode: ({ item }) => {
      const { startTime = '', durationTime = '' } = item || {};

      return (
        <Text customClass="text-primary-300 font-light lg:hidden" size="xs">
          {formatTimeAppointment({
            start: startTime,
            duration: durationTime,
          })}
        </Text>
      );
    },
  },
  {
    key: 'actions',
    title: 'Actions',
    customNode: ({ id }) => (
      <div className="flex justify-end">
        <Button
          aria-label="actions"
          color="stone"
          className="p-0 min-w-4 h-4 md:h-[26px] md:min-w-[26px] bg-background-100 rounded-md"
        >
          {/* <MoreIcon customClass=" w-[11px] h-[11px] md:w-4 md:h-4" /> */}
          {id}
        </Button>
      </div>
    ),
  },
];

export interface AppointmentsUpcomingListProps extends MetaResponse {
  appointments: AppointmentResponse[];
  defaultStatus: string;
  role: string;
}

const AppointmentsUpcomingList = memo(
  ({ appointments, defaultStatus }: AppointmentsUpcomingListProps) => {
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
        const status = searchParams.get('status');

        if (!status) {
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
      <Card className="w-full lg:max-w-[320px] 2xl:max-w-[550px] h-fit p-4 pl-5 bg-background-200 mb-10">
        <div className="flex justify-between items-center">
          <Text customClass="text-lg font-bold text-primary-100">
            Appointments
          </Text>
          <div>
            <Select
              aria-label="appointment status"
              options={APPOINTMENT_STATUS_OPTIONS}
              defaultSelectedKeys={status}
              disabledKeys={status}
              selectedKeys={status}
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
        {isPending ? (
          <AppointmentsUpcomingListSkeleton />
        ) : (
          <DataGrid
            data={appointments}
            columns={COLUMNS_APPOINTMENT as ColumnType<unknown>[]}
            classWrapper="pt-4"
            classCell="pb-4"
          />
        )}
      </Card>
    );
  },
);

AppointmentsUpcomingList.displayName = 'AppointmentsUpcomingList';
export default AppointmentsUpcomingList;
