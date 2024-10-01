import { memo } from 'react';

import { Button, Text } from '@/components/ui';
import { BaseModal } from '../BaseModal';
import { Divider } from '@nextui-org/react';

interface ConfirmModalProps {
  title: string;
  subTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ConfirmModal = ({
  title,
  subTitle,
  isOpen,
  onClose,
  onDelete,
}: ConfirmModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} placement="center">
    <div className="flex flex-col items-center">
      <Text variant="title" size="2xl">
        {title}
      </Text>
      <Text customClass="my-6">{subTitle}</Text>
    </div>
    <Divider />
    <div className="flex gap-4 px-6 justify-center mt-6">
      <Button
        onClick={onClose}
        variant="outline"
        color="outline"
        className="font-medium w-full"
      >
        No
      </Button>
      <Button
        color="secondary"
        onClick={onDelete}
        className="font-medium w-full"
      >
        Yes
      </Button>
    </div>
  </BaseModal>
);

export default memo(ConfirmModal);
