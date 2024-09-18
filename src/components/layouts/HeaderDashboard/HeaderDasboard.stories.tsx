import type { Meta, StoryObj } from '@storybook/react';

import HeaderDashboard from '@/components/layouts/HeaderDashboard';
import { MOCK_NOTIFICATION_LIST } from '@/mocks';

const meta = {
  title: 'Layouts/HeaderDashboard',
  tags: ['autodocs'],

  component: HeaderDashboard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HeaderDashboard>;

export default meta;
type Story = StoryObj<typeof HeaderDashboard>;

export const HeaderDashboardDefault: Story = {
  decorators: [
    (Story) => (
      <div className="w-[1000px] pr-[44px] bg-background-200">
        <Story />
      </div>
    ),
  ],

  args: {
    avatarUrl: 'https://i.pravatar.cc/300',
    userName: 'Jessica',
    notificationList: MOCK_NOTIFICATION_LIST,
  },
};

export const HeaderDashboardEmptyNotification: Story = {
  decorators: [
    (Story) => (
      <div className="w-[1000px] pr-[44px] bg-background-200">
        <Story />
      </div>
    ),
  ],

  args: {
    avatarUrl: 'https://i.pravatar.cc/300',
    userName: 'Jessica',
    notificationList: [],
  },
};

export const HeaderDashboardEmptyAvatar: Story = {
  decorators: [
    (Story) => (
      <div className="w-[1000px] pr-[44px] bg-background-200">
        <Story />
      </div>
    ),
  ],

  args: {
    avatarUrl: '',
    userName: 'Jessica',
    notificationList: MOCK_NOTIFICATION_LIST,
  },
};

export const HeaderDashboardEmptyAvatarAndName: Story = {
  decorators: [
    (Story) => (
      <div className="w-[1000px] pr-[44px] bg-background-200">
        <Story />
      </div>
    ),
  ],

  args: {
    avatarUrl: '',
    userName: '',
    notificationList: MOCK_NOTIFICATION_LIST,
  },
};
