'use client';
import dynamic from 'next/dynamic';

// Types
import { AppointmentModel } from '@/types';

// Components
import { BaseModal } from '@/components/ui/BaseModal';
const AppointmentForm = dynamic(() => import('../AppointmentForm'));

export type AppointmentModalProps = {
  data?: AppointmentModel;
  userId: string;
  role: string;
  isOpen: boolean;
  onClose: () => void;
};
const AppointmentModal = ({
  userId,
  role,
  data,
  isOpen,
  onClose,
}: AppointmentModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} placement="center" size="2xl">
      <AppointmentForm
        userId={userId}
        role={role}
        data={data}
        onClose={onClose}
      />
    </BaseModal>
  );
};

export default AppointmentModal;
