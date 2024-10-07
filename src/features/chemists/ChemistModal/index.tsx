'use client';

import { memo } from 'react';

// Types
import { AppointmentModel } from '@/types';

// Components
import { BaseModal } from '@/components/ui/BaseModal';
import ChemistForm from '../ChemistForm';

// Utils
import { USER_OPTIONS } from '@/mocks/user';

export type ChemistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data?: AppointmentModel;
  id?: string;
};

const ChemistModal = memo(({ isOpen, onClose, id }: ChemistModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} placement="center" size="2xl">
      {/* TODO: Update later */}
      <ChemistForm data={USER_OPTIONS[0]} id={id} />
    </BaseModal>
  );
});

export default ChemistModal;
ChemistModal.displayName = 'ChemistModal';
