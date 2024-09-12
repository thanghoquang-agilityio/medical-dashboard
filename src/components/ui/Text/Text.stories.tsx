import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '.';

const meta = {
  title: 'Components/Text',
  tags: ['autodocs'],

  component: Text,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof Text>;

export const TextDefault: Story = {
  args: {
    children: 'Default',
    variant: 'default',
    size: 'md',
    type: 'nowrap',
  },
};

export const TextPrimary: Story = {
  args: {
    children: 'Text normal',
    variant: 'primary',
    type: 'nowrap',
  },
};

export const TextSecondary: Story = {
  args: {
    children: 'Text color blue',
    variant: 'secondary',
    size: 'lg',
    type: 'nowrap',
  },
};

export const TextTertiary: Story = {
  args: {
    children: 'Text color emerald',
    variant: 'tertiary',
    size: 'md',
    type: 'nowrap',
  },
};

export const TextTitle: Story = {
  args: {
    children: 'Title',
    variant: 'title',
    type: 'nowrap',
  },
};

export const TextSubTitle: Story = {
  args: {
    children: 'Sub Title',
    variant: 'subTitle',
    type: 'nowrap',
  },
};

export const TextDescription: Story = {
  args: {
    children: 'Description',
    variant: 'description',
    type: 'nowrap',
  },
};

export const TextSuccess: Story = {
  args: {
    children: 'Success',
    variant: 'success',
    size: 'sm',
    type: 'nowrap',
  },
};

export const TextWarning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
    size: 'sm',
    type: 'nowrap',
  },
};

export const TextError: Story = {
  args: {
    children: 'Error',
    variant: 'error',
    size: 'sm',
    type: 'nowrap',
  },
};
