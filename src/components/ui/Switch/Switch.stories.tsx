import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '@/components/ui';
import { DarkIcon, LightIcon } from '@/icons';

const meta = {
  title: 'Components/Switch',
  tags: ['autodocs'],

  component: Switch,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

export const SwitchDefault: Story = {
  args: {
    color: 'default',
    size: 'md',
    startIcon: <LightIcon customClass="text-black" />,
    endIcon: <DarkIcon customClass="text-black" />,
  },
};

export const SwitchSmall: Story = {
  args: {
    color: 'primary',
    size: 'sm',
    startIcon: <LightIcon customClass="text-black" />,
    endIcon: <DarkIcon customClass="text-black" />,
  },
};

export const SwitchMedium: Story = {
  args: {
    color: 'primary',
    size: 'md',
    startIcon: <LightIcon customClass="text-black" />,
    endIcon: <DarkIcon customClass="text-black" />,
  },
};

export const SwitchLarge: Story = {
  args: {
    color: 'primary',
    size: 'lg',
    startIcon: <LightIcon customClass="text-black" />,
    endIcon: <DarkIcon customClass="text-black" />,
  },
};

export const SwitchSuccess: Story = {
  args: {
    color: 'success',
    size: 'lg',
    startIcon: <LightIcon customClass="text-black" />,
    endIcon: <DarkIcon customClass="text-black" />,
  },
};

export const SwitchWarning: Story = {
  args: {
    color: 'warning',
    size: 'lg',
    startIcon: <LightIcon customClass="text-black" />,
    endIcon: <DarkIcon customClass="text-black" />,
  },
};

export const SwitchPrimary: Story = {
  args: {
    color: 'primary',
    size: 'lg',
    startIcon: <LightIcon customClass="text-black" />,
    endIcon: <DarkIcon customClass="text-black" />,
  },
};

export const SwitchSecondary: Story = {
  args: {
    color: 'secondary',
    size: 'lg',
    startIcon: <LightIcon customClass="text-black" />,
    endIcon: <DarkIcon customClass="text-black" />,
  },
};
