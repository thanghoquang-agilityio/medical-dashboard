import { memo, ReactNode } from 'react';

// Components
import { Modal, ModalContent, ModalProps } from '@nextui-org/react';

interface Props extends ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const BaseModal = memo(({ isOpen, children, onClose, size }: Props) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    size={size}
    classNames={{
      closeButton: 'text-primary-100',
      base: 'bg-background-200 p-4',
    }}
  >
    <ModalContent>{children}</ModalContent>
  </Modal>
));

BaseModal.displayName = 'BaseModal';
