import type { Meta, StoryObj } from '@storybook/react';

import { Status } from '.';

const meta = {
  title: 'Components/Status',
  tags: ['autodocs'],

  component: Status,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof Status>;

export const StatusSuccess: Story = {
  args: {
    status: 0,
  },
};

export const StatusWarning: Story = {
  args: {
    status: 1,
  },
};

export const StatusError: Story = {
  args: {
    status: 2,
  },
};
