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
} from '@/types';

// Actions
import { deleteAppointment, updateAppointment } from '@/actions/appointment';

// Components
import { useToast } from '@/context/toast';
import { Select, Text } from '@/components/ui';
import { AppointmentsUpcomingListSkeleton } from './AppointmentsUpcomingSkeleton';
import { createColumns } from './columns';
import { getStatusKey } from '@/utils';
const DataGrid = lazy(() => import('@/components/ui/DataGrid'));
const ConfirmModal = lazy(() => import('@/components/ui/ConfirmModal'));

export interface AppointmentsUpcomingListProps extends MetaResponse {
  appointments: AppointmentResponse[];
  defaultStatus: string;
  userId: string;
  role: string;
}

const AppointmentsUpcomingList = memo(
  ({
    appointments,
    defaultStatus,
    userId,
    role,
  }: AppointmentsUpcomingListProps) => {
    const openToast = useToast();
    const isAdmin = role === ROLE.ADMIN;

    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState(new Set<string>([defaultStatus]));
    const [appointmentsList, setAppointmentsList] =
      useState<AppointmentResponse[]>(appointments);
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

    const statusArray = Array.from(status);

    const columns = createColumns({
      userId,
      isAdmin,
      status: statusArray[0],
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

      const newAppointment = appointmentsList.filter(
        (item) => item.id !== appointmentId,
      );
      setAppointmentsList(newAppointment);

      openToast({
        message: SUCCESS_MESSAGE.DELETE('appointment'),
        type: STATUS_TYPE.SUCCESS,
      });
      setIsLoading(false);
      onClosConfirm();
    }, [appointmentId, appointmentsList, onClosConfirm, openToast]);

    const handleCancelAppointment = useCallback(async () => {
      setIsLoading(true);
      const statusPayload = getStatusKey('cancelled') || 0;
      const error = (
        await updateAppointment(appointmentId, {
          status: statusPayload as AppointmentStatus,
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

      updateSearchParams(APPOINTMENT_STATUS_OPTIONS[2].key);

      openToast({
        message: SUCCESS_MESSAGE.CANCEL('appointment'),
        type: STATUS_TYPE.SUCCESS,
      });
      setIsLoading(false);
      onClosConfirm();
    }, [appointmentId, onClosConfirm, openToast, updateSearchParams]);

    return (
      <>
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
              data={appointmentsList}
              columns={columns as ColumnType<unknown>[]}
              classWrapper="pt-4"
              classCell="pb-4"
            />
          )}

          <ConfirmModal
            title="Confirmation"
            subTitle={`Do you want to ${isAdmin ? 'delete' : 'cancel'} this appointment?`}
            isOpen={isOpenConfirm}
            isLoading={isLoading}
            onClose={onClosConfirm}
            onAction={
              isAdmin ? handleDeleteAppointment : handleCancelAppointment
            }
          />
        </Card>
      </>
    );
  },
);

AppointmentsUpcomingList.displayName = 'AppointmentsUpcomingList';
export default AppointmentsUpcomingList;
