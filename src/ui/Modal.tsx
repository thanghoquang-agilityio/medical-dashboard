'use client';
import { Button } from '@/components/ui';
import { BaseModal } from '@/components/ui/BaseModal';
import { useDisclosure } from '@nextui-org/react';

export const Modal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onSubmit = () => {};
  return (
    <>
      <Button onClick={onOpen}>Open</Button>
      <BaseModal
        isOpen={isOpen}
        size="3xl"
        title={'This is title'}
        onClose={onClose}
        onSubmit={onSubmit}
      >
        This is content
      </BaseModal>
    </>
  );
};
