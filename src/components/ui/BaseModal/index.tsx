import { memo, ReactNode } from 'react';

// Components
import { Modal, ModalContent, ModalProps } from '@nextui-org/react';

interface Props extends ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  placement?:
    | 'center'
    | 'top-center'
    | 'bottom-center'
    | 'auto'
    | 'top'
    | 'bottom'
    | undefined;
}

export const BaseModal = memo(
  ({ isOpen, children, onClose, size, placement }: Props) => (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      placement={placement}
      classNames={{
        wrapper: 'sm:items-center md:items-center',
        closeButton: 'text-primary-100',
        base: 'bg-background-100 p-4',
      }}
      scrollBehavior="outside"
    >
      <ModalContent>{children}</ModalContent>
    </Modal>
  ),
);

BaseModal.displayName = 'BaseModal';
