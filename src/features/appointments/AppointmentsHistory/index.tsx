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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Card, useDisclosure } from '@nextui-org/react';

// Types
import {
  AppointmentModel,
  AppointmentResponse,
  AppointmentStatus,
  ColumnType,
  MetaResponse,
  ROLE,
  STATUS_TYPE,
  UserLogged,
} from '@/types';

// Constants
import {
  APPOINTMENT_STATUS_OPTIONS,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '@/constants';

// Helper
import { useToast } from '@/context/toast';
import { getStatusKey } from '@/utils';

// Service
import { deleteAppointment, updateAppointment } from '@/actions/appointment';

// Components
import { Button, InputSearch, Select, Text } from '@/components/ui';
import { AppointmentsHistoryListSkeleton } from './AppointmentsHistorySkeleton';
import AppointmentModal from '../AppointmentModal';
import { createColumns } from './columns';

// Hooks
import { useNotification } from '@/hooks';

const DataGrid = lazy(() => import('@/components/ui/DataGrid'));
const ConfirmModal = lazy(() => import('@/components/ui/ConfirmModal'));

export interface AppointmentsHistoryProps extends MetaResponse {
  userLogged: UserLogged | null;
  appointments: AppointmentResponse[];
  defaultStatus?: string;
}

const AppointmentsHistory = ({
  userLogged,
  appointments,
  pagination,
  defaultStatus = '',
}: AppointmentsHistoryProps) => {
  const openToast = useToast();
  const { id: userId = '', role: roleModel } = userLogged || {};
  const { name: role = ROLE.NORMAL_USER } = roleModel || {};

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
      const value = e.target.value;
      if (value !== status.values().next().value) params.delete('page');

      if (value === 'all') {
        params.delete('status');
        handleReplaceURL?.(params);

        return;
      }

      setStatus(new Set([value]));
      updateSearchParams(value);
    },
    [handleReplaceURL, params, status, updateSearchParams],
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
    userId,
    isAdmin,
    onEdit: handleOpenEditModal,
    onRemoveOrCancel: handleOpenConfirmModal,
  });

  const { handleCreateNotification } = useNotification({ userLogged });

  const handleDeleteAppointment = useCallback(async () => {
    setIsLoading(true);
    const { appointment, error } = await deleteAppointment(appointmentId);
    if (error) {
      openToast({
        message: ERROR_MESSAGE.DELETE('appointment'),
        type: STATUS_TYPE.ERROR,
      });

      setIsLoading(false);
      return;
    }

    if (appointment) {
      handleCreateNotification(appointment, 'deleted');
      onClosConfirm();
    }
  }, [appointmentId, handleCreateNotification, onClosConfirm, openToast]);

  const handleCancelAppointment = useCallback(async () => {
    setIsLoading(true);
    const statusPayload = getStatusKey('cancelled') || 0;
    const { appointment, error } = await updateAppointment(appointmentId, {
      status: statusPayload as AppointmentStatus,
    });

    if (error) {
      openToast({
        message: ERROR_MESSAGE.CANCEL('appointment'),
        type: STATUS_TYPE.ERROR,
      });
      setIsLoading(false);
      return;
    }

    if (appointment) {
      openToast({
        message: SUCCESS_MESSAGE.CANCEL('appointment'),
        type: STATUS_TYPE.SUCCESS,
      });

      handleCreateNotification(appointment, 'cancelled');
      onClosConfirm();
    }
  }, [appointmentId, handleCreateNotification, onClosConfirm, openToast]);

  const options = [{ key: 'all', label: 'All' }, ...APPOINTMENT_STATUS_OPTIONS];

  return (
    <>
      <div className="flex justify-between gap-10 my-8">
        <InputSearch placeholder="Search Appointments" />
        <Button
          onClick={handleOpenCreateModal}
          className="h-[52px] font-medium"
        >
          Create
        </Button>
      </div>
      <Card className="w-full px-4 py-6 bg-background-200">
        <div className="flex justify-between items-center">
          <Text customClass="text-xl font-bold text-primary-100">History</Text>
          <div>
            <Select
              aria-label="Status"
              options={options}
              selectedKeys={status}
              defaultSelectedKeys={APPOINTMENT_STATUS_OPTIONS[0].key}
              placeholder="Status"
              classNames={{
                base: 'max-w-[102px] max-h-[36px]',
                mainWrapper: 'max-w-[102px] max-h-[36px]',
                innerWrapper: 'w-[80px]',
                trigger: 'min-h-[36px]',
                listbox: 'px-0',
              }}
              onChange={handleSelectStatus}
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          {isPending ? (
            <AppointmentsHistoryListSkeleton isAdmin={isAdmin} />
          ) : (
            <DataGrid
              data={appointments}
              startTransition={startTransition}
              columns={columns as ColumnType<unknown>[]}
              pagination={pagination}
              hasDivider
              classWrapper="p-1"
              id="appointments-history"
            />
          )}
        </div>
      </Card>

      <AppointmentModal
        data={appointment}
        id={appointmentId}
        userLogged={userLogged}
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
