import type { Meta, StoryObj } from '@storybook/react';
import { useDisclosure } from '@nextui-org/react';

// Components
import { BaseModal } from '.';

const meta = {
  title: 'Components/BaseModal',
  component: BaseModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BaseModal>;

export default meta;

type Story = StoryObj<typeof BaseModal>;

export const BaseModalDefault: Story = {
  render: (args) => {
    const { isOpen, onOpen, onClose } = useDisclosure({
      defaultOpen: args.isOpen,
    });

    return (
      <>
        <button onClick={onOpen}>Open Modal</button>
        <BaseModal {...args} isOpen={isOpen} onClose={onClose} />
      </>
    );
  },
  args: {
    children: 'This is content',
  },
  argTypes: {
    onClose: { action: 'closed' },
  },
};
