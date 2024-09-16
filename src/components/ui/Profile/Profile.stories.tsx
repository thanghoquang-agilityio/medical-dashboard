import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Profile } from '@/components/ui';

// Mocks
import { MOCK_PROFILE } from '@/mocks';

const meta = {
  title: 'Components/Profile',
  tags: ['autodocs'],

  component: Profile,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof Profile>;

export const ProfileDefault: Story = {
  args: { ...MOCK_PROFILE },
};

export const ProfileSmall: Story = {
  args: {
    ...MOCK_PROFILE,
    avatarProps: {
      ...MOCK_PROFILE.avatarProps,
      size: 'sm',
    },
  },
};

export const ProfileMedium: Story = {
  args: {
    ...MOCK_PROFILE,
    avatarProps: {
      ...MOCK_PROFILE.avatarProps,
      size: 'md',
    },
  },
};

export const ProfileLarge: Story = {
  args: {
    ...MOCK_PROFILE,
    avatarProps: {
      ...MOCK_PROFILE.avatarProps,
      size: 'lg',
    },
  },
};

export const ProfileWithFallback: Story = {
  args: {
    ...MOCK_PROFILE,
    avatarProps: {
      src: '',
      size: 'lg',
      showFallback: true,
    },
  },
};
