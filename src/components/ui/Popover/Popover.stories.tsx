import type { Meta, StoryObj } from '@storybook/react';

import { Button, Popover } from '@/components/ui';

const meta = {
  title: 'Components/Popover',
  tags: ['autodocs'],

  component: Popover,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof Popover>;

export const PopoverDefault: Story = {
  args: {
    popoverTrigger: <Button>Trigger</Button>,
    popoverContent: <p className="text-danger-100">This is content</p>,
  },
};
