import type { Meta, StoryObj } from '@storybook/react';

import { Popover } from '@/components/ui';
import { Button } from '@nextui-org/react';

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
    popoverContent: <p>This is content</p>,
  },
};
