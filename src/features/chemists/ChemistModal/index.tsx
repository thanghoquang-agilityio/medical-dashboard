'use client';

import { memo } from 'react';

// Types
import { Option, UserModel } from '@/types';

// Components
import { BaseModal } from '@/components/ui/BaseModal';
import ChemistForm from '../ChemistForm';

export type ChemistModalProps = {
  isOpen: boolean;
  specialtyOptions: Option[];
  onClose: () => void;
  data?: UserModel;
  id?: string;
};

const ChemistModal = memo(
  ({ isOpen, onClose, specialtyOptions, id, data }: ChemistModalProps) => {
    return (
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        size="2xl"
      >
        <ChemistForm
          data={data}
          id={id}
          onClose={onClose}
          specialtyOptions={specialtyOptions}
        />
      </BaseModal>
    );
  },
);

export default ChemistModal;
ChemistModal.displayName = 'ChemistModal';
