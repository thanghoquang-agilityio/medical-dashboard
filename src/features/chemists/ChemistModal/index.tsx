'use client';

import { memo } from 'react';

// Types
import { UserModel } from '@/types';

// Components
import { BaseModal } from '@/components/ui/BaseModal';
import ChemistForm from '../ChemistForm';

// Utils
// import { USER_OPTIONS } from '@/mocks/user';

export type ChemistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data?: UserModel;
  id?: string;
};

const ChemistModal = memo(
  ({ isOpen, onClose, id, data }: ChemistModalProps) => {
    return (
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        size="2xl"
      >
        {/* TODO: Update later */}
        <ChemistForm data={data} id={id} onClose={onClose} />
      </BaseModal>
    );
  },
);

export default ChemistModal;
ChemistModal.displayName = 'ChemistModal';
