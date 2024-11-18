'use client';

import { memo } from 'react';
import { useDisclosure } from '@nextui-org/react';

// Components
import { Button } from '@/components/ui';
import AppointmentModal from '../AppointmentModal';

// Types
import { UserLogged } from '@/types';

export interface AppointmentCreateProps {
  userLogged: UserLogged | null;
}
const AppointmentCreate = ({ userLogged }: AppointmentCreateProps) => {
  const { onClose, onOpen, isOpen } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} className="h-[52px] font-medium">
        Create
      </Button>
      {isOpen && (
        <AppointmentModal
          userLogged={userLogged}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
    </>
  );
};

export default memo(AppointmentCreate);
