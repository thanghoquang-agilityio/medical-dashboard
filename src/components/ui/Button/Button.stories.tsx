import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Button } from '.';
import { BellIcon, CloseIcon } from '@/icons';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline'],
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'red', 'stone', 'green'],
    },
    size: {
      control: { type: 'select' },
      options: ['tiny', 'xs', 'md'],
    },
    isIconOnly: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;
export const Primary: Story = {
  args: {
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    color: 'secondary',
  },
};

export const OutLine: Story = {
  args: {
    children: 'OutLine',
    variant: 'outline',
    color: 'default',
  },
};

export const Bell: Story = {
  args: {
    children: <BellIcon />,
    isIconOnly: true,
    size: 'tiny',
    color: 'stone',
  },
};

export const Close: Story = {
  args: {
    children: <CloseIcon />,
    isIconOnly: true,
    size: 'tiny',
    color: 'red',
  },
};

export const Text: Story = {
  args: {
    children: 'Chat',
    color: 'green',
  },
};
