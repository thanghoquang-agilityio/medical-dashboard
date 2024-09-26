import type { Meta, StoryObj } from '@storybook/react';

import AppointmentList from '.';
import { MOCK_APPOINTMENTS } from '@/mocks';
import { ROLE } from '@/types';

const meta = {
  title: 'Features/AppointmentList',
  tags: ['autodocs'],

  component: AppointmentList,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: 'centered',
  },
} satisfies Meta<typeof AppointmentList>;

export default meta;
type Story = StoryObj<typeof AppointmentList>;

export const Default: Story = {
  args: {
    appointments: MOCK_APPOINTMENTS,
  },
};
export const AppointmentListEmpty: Story = {
  args: {
    appointments: [],
  },
};

export const AppointmentListWithAdminRole: Story = {
  args: {
    appointments: MOCK_APPOINTMENTS,
    currentUserRole: ROLE.ADMIN,
  },
};

export const AppointmentListWithNormalUserRole: Story = {
  args: {
    appointments: MOCK_APPOINTMENTS,
  },
};
