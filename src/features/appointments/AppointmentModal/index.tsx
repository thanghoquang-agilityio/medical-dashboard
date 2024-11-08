'use client';
import { Suspense, lazy, memo } from 'react';

// Types
import { AppointmentModel, UserLogged } from '@/types';

// Components
import { BaseModal } from '@/components/ui/BaseModal';
import { AppointmentFormSkeleton } from '../AppointmentForm/AppointmentFormSkeleton';
const AppointmentForm = lazy(() => import('../AppointmentForm'));

export type AppointmentModalProps = {
  userLogged: UserLogged | null;
  isOpen: boolean;
  onClose: () => void;
  data?: AppointmentModel;
  id?: string;
};
const AppointmentModal = memo(
  ({ userLogged, data, id, isOpen, onClose }: AppointmentModalProps) => {
    return (
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        size="2xl"
      >
        <Suspense fallback={<AppointmentFormSkeleton data={data} />}>
          <AppointmentForm
            userLogged={userLogged}
            data={data}
            id={id}
            onClose={onClose}
          />
        </Suspense>
      </BaseModal>
    );
  },
);

export default AppointmentModal;
AppointmentModal.displayName = 'AppointmentModal';
