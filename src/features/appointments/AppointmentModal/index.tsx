'use client';
import { Suspense, lazy, memo } from 'react';

// Types
import { AppointmentModel } from '@/types';

// Components
import { BaseModal } from '@/components/ui/BaseModal';
import { AppointmentFormSkeleton } from '../AppointmentForm/AppointmentFormSkeleton';
const AppointmentForm = lazy(() => import('../AppointmentForm'));

export type AppointmentModalProps = {
  data?: AppointmentModel;
  appointmentId?: string;
  userId: string;
  role: string;
  isOpen: boolean;
  onClose: () => void;
};
const AppointmentModal = memo(
  ({
    userId,
    role,
    data,
    appointmentId,
    isOpen,
    onClose,
  }: AppointmentModalProps) => {
    return (
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        size="2xl"
      >
        <Suspense fallback={<AppointmentFormSkeleton data={data} />}>
          <AppointmentForm
            userId={userId}
            role={role}
            data={data}
            appointmentId={String(appointmentId)}
            onClose={onClose}
          />
        </Suspense>
      </BaseModal>
    );
  },
);

export default AppointmentModal;
AppointmentModal.displayName = 'AppointmentModal';
