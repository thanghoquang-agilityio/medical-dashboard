import type { Meta, StoryObj } from '@storybook/react';

import { TimeInput } from '.';

const meta = {
  title: 'Components/TimeInput',
  tags: ['autodocs'],

  component: TimeInput,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TimeInput>;

export default meta;
type Story = StoryObj<typeof TimeInput>;

export const TimeInputDefault: Story = {
  args: {
    color: 'default',
    size: 'sm',
    border: 'default',
    label: 'Start Time',
    labelPlacement: 'inside',
  },
};
