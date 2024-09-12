import type { Meta, StoryObj } from '@storybook/react';

import { Status } from '.';
import { STATUS_TYPE } from '@/types';

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
    status: STATUS_TYPE.SUCCESS,
  },
};

export const StatusWarning: Story = {
  args: {
    status: STATUS_TYPE.WARNING,
  },
};

export const StatusError: Story = {
  args: {
    status: STATUS_TYPE.ERROR,
  },
};
