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

// Constants
import {
  APPOINTMENT_STATUS_OPTIONS,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '@/constants';

// Types
import {
  AppointmentResponse,
  AppointmentStatus,
  ColumnType,
  MetaResponse,
  ROLE,
  STATUS_TYPE,
  UserLogged,
} from '@/types';

// Helper
import { deleteAppointment, updateAppointment } from '@/actions/appointment';
import { getStatusKey } from '@/utils';
import { useToast } from '@/context/toast';

// Components
import { Select, Text } from '@/components/ui';
import { createColumns } from './columns';

// Hooks
import { useNotification } from '@/hooks';
import { AppointmentsUpcomingListSkeleton } from './AppointmentsUpcomingSkeleton';
const DataGrid = lazy(() => import('@/components/ui/DataGrid'));
const ConfirmModal = lazy(() => import('@/components/ui/ConfirmModal'));

export interface AppointmentsUpcomingListProps extends MetaResponse {
  appointments: AppointmentResponse[];
  defaultStatus: string;
  userLogged: UserLogged | null;
}

const AppointmentsUpcomingList = memo(
  ({
    appointments,
    defaultStatus,
    userLogged,
  }: AppointmentsUpcomingListProps) => {
    const openToast = useToast();
    const { id: userId = '', role: roleModel } = userLogged || {};
    const { name: role = ROLE.NORMAL_USER } = roleModel || {};

    const isAdmin = role === ROLE.ADMIN;

    const [status, setStatus] = useState(new Set<string>([defaultStatus]));

    const [appointmentId, setAppointmentId] = useState<string>('');

    const searchParams = useSearchParams() ?? '';
    const pathname = usePathname() ?? '';
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

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

        if (!status) params.append('status', value);
        else params.set('status', value);

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
      onRemoveOrCancel: handleOpenConfirmModal,
    });

    const { handleCreateNotification } = useNotification({
      userLogged,
    });

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
        openToast({
          message: SUCCESS_MESSAGE.DELETE('appointment'),
          type: STATUS_TYPE.SUCCESS,
        });

        handleCreateNotification(appointment, 'deleted');
      }

      setIsLoading(false);
      onClosConfirm();
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
        handleCreateNotification(appointment, 'cancelled');
      }

      updateSearchParams(APPOINTMENT_STATUS_OPTIONS[2].key);
      setIsLoading(false);
      onClosConfirm();
    }, [
      appointmentId,
      handleCreateNotification,
      onClosConfirm,
      openToast,
      updateSearchParams,
    ]);

    return (
      <Card className="w-full xl:max-w-[320px] 2xl:max-w-[550px] h-fit py-4 px-5 bg-background-200">
        <div className="flex justify-between items-center">
          <Text customClass="text-lg font-bold text-primary-100">
            Appointments
          </Text>
          <div>
            <Select
              aria-label="appointment status"
              options={APPOINTMENT_STATUS_OPTIONS}
              defaultSelectedKeys={APPOINTMENT_STATUS_OPTIONS[0].key}
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
            columns={columns as ColumnType<unknown>[]}
            classWrapper="pt-4 rounded-none"
            id="appointment-upcoming"
            classCell="pb-4"
          />
        )}

        <ConfirmModal
          title="Confirmation"
          subTitle={`Do you want to ${isAdmin ? 'delete' : 'cancel'} this appointment?`}
          isOpen={isOpenConfirm}
          isLoading={isLoading}
          onClose={onClosConfirm}
          onAction={isAdmin ? handleDeleteAppointment : handleCancelAppointment}
        />
      </Card>
    );
  },
);

AppointmentsUpcomingList.displayName = 'AppointmentsUpcomingList';
export default AppointmentsUpcomingList;
