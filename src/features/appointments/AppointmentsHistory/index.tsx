'use client';

import {
  ChangeEvent,
  Key,
  lazy,
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
  STATUS_TYPE,
} from '@/types';

// Constants
import {
  APPOINTMENT_STATUS_OPTIONS,
  ERROR_MESSAGE,
  ROLE,
  SUCCESS_MESSAGE,
} from '@/constants';

// Hocs
import { useToast } from '@/context/toast';

// Components
import { Button, InputSearch, Select, Text } from '@/components/ui';
import { AppointmentsHistoryListSkeleton } from './AppointmentsHistorySkeleton';
import AppointmentModal from '../AppointmentModal';
import { createColumns } from './columns';

// Service
import { deleteAppointment, updateAppointment } from '@/actions/appointment';

const DataGrid = lazy(() => import('@/components/ui/DataGrid'));
const ConfirmModal = lazy(() => import('@/components/ui/ConfirmModal'));

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
  const openToast = useToast();
  const isAdmin = role === ROLE.ADMIN;

  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(new Set<string>([defaultStatus]));
  const [appointment, setAppointment] = useState<AppointmentModel>();
  const [appointmentId, setAppointmentId] = useState<string>('');

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

  const handleOpenCreateModal = useCallback(() => {
    setAppointment(undefined);
    onOpen();
  }, [onOpen]);

  const handleOpenEditModal = useCallback(
    (key?: Key) => {
      const appointment = appointments.find(
        (appointment) => key == appointment.id,
      );
      const { attributes, id = '' } = appointment || {};

      setAppointment(attributes);
      setAppointmentId(id);
      onOpen();
    },
    [appointments, onOpen],
  );

  const {
    isOpen: isOpenConfirm,
    onClose: onClosConfirm,
    onOpen: onOpenConfirm,
  } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenConfirmModal = useCallback(
    (key?: Key) => {
      const appointment = appointments.find(
        (appointment) => key == appointment.id,
      );
      const { id = '' } = appointment || {};

      setAppointmentId(id);
      onOpenConfirm();
    },
    [appointments, onOpenConfirm],
  );

  const columns = createColumns({
    isAdmin,
    onEdit: handleOpenEditModal,
    onRemoveOrCancel: handleOpenConfirmModal,
  });

  const handleDeleteAppointment = useCallback(async () => {
    setIsLoading(true);
    const { error } = await deleteAppointment(appointmentId);
    if (error) {
      openToast({
        message: ERROR_MESSAGE.DELETE('appointment'),
        type: STATUS_TYPE.ERROR,
      });

      setIsLoading(false);
      return;
    }

    openToast({
      message: SUCCESS_MESSAGE.DELETE('appointment'),
      type: STATUS_TYPE.SUCCESS,
    });
    onClosConfirm();
  }, [appointmentId, onClosConfirm, openToast]);

  const handleCancelAppointment = useCallback(async () => {
    setIsLoading(true);
    const canceledStatus = APPOINTMENT_STATUS_OPTIONS.find(
      (option) => option.key === 'canceled',
    );

    if (!canceledStatus) return;
    const status = canceledStatus.value;
    const error = (
      await updateAppointment(appointmentId, {
        status,
      })
    ).error;

    if (error) {
      openToast({
        message: ERROR_MESSAGE.CANCEL('appointment'),
        type: STATUS_TYPE.ERROR,
      });
      setIsLoading(false);

      return;
    }

    openToast({
      message: SUCCESS_MESSAGE.CANCEL('appointment'),
      type: STATUS_TYPE.SUCCESS,
    });
  }, [appointmentId, openToast]);

  return (
    <>
      <div className="flex justify-between gap-10">
        <InputSearch
          placeholder="Search Appointments"
          classNames={{ mainWrapper: 'pb-10' }}
        />
        <Button onClick={handleOpenCreateModal} className="mt-3 font-medium">
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
            />
          )}
        </div>
      </Card>

      <AppointmentModal
        data={appointment}
        id={appointmentId}
        userId={userId}
        role={role}
        onClose={onClose}
        isOpen={isOpen}
      />

      <ConfirmModal
        title="Confirmation"
        subTitle={`Do you want to ${isAdmin ? 'delete' : 'cancel'} this appointment?`}
        isOpen={isOpenConfirm}
        isLoading={isLoading}
        onClose={onClosConfirm}
        onAction={isAdmin ? handleDeleteAppointment : handleCancelAppointment}
      />
    </>
  );
};

export default memo(AppointmentsHistory);
