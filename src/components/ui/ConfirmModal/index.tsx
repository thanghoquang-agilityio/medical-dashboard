import { memo } from 'react';

import { Button, Text } from '@/components/ui';
import { BaseModal } from '../BaseModal';
import { Divider } from '@nextui-org/react';

interface ConfirmModalProps {
  title: string;
  subTitle: string;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onAction: () => void;
}

const ConfirmModal = ({
  title,
  subTitle,
  isOpen,
  isLoading,
  onClose,
  onAction,
}: ConfirmModalProps) => (
  <BaseModal
    aria-label="confirm-modal"
    isOpen={isOpen}
    onClose={onClose}
    placement="center"
    classNames={{
      wrapper: 'sm:items-center items-center',
    }}
  >
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
        isDisabled={isLoading}
      >
        No
      </Button>
      <Button
        onClick={onAction}
        className="font-medium w-full"
        isLoading={isLoading}
      >
        Yes
      </Button>
    </div>
  </BaseModal>
);

export default memo(ConfirmModal);
