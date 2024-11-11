'use client';

import { Button } from '@/components/ui';
import { useDisclosure } from '@nextui-org/react';
import { useCallback } from 'react';
import AppointmentModal from '../AppointmentModal';
import { UserLogged } from '@/types';

export interface AppointmentCreateProps {
  userLogged: UserLogged | null;
}
export const AppointmentCreate = ({ userLogged }: AppointmentCreateProps) => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const handleOpenCreateModal = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      <Button onClick={handleOpenCreateModal} className="h-[52px] font-medium">
        Create
      </Button>
      <AppointmentModal
        userLogged={userLogged}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};
