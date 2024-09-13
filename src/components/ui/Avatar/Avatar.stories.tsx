import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '@/components/ui';

const meta = {
  title: 'Components/Avatar',
  tags: ['autodocs'],

  component: Avatar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

export const AvatarDefault: Story = {
  args: {
    color: 'warning',
    size: 'sm',
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
};

export const AvatarSmall: Story = {
  args: {
    color: 'warning',
    size: 'md',
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
};

export const AvatarMedium: Story = {
  args: {
    color: 'warning',
    size: 'lg',
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
};

export const AvatarHasBorder: Story = {
  args: {
    size: 'lg',
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    hasBorder: true,
    color: 'warning',
  },
};

export const AvatarWithFallback: Story = {
  args: {
    color: 'warning',
    size: 'lg',
    src: '',
    name: 'Fallback Name',
  },
};

export const AvatarDisabled: Story = {
  args: {
    color: 'warning',
    size: 'md',
    isDisabled: true,
  },
};
