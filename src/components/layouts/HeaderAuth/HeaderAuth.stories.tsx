import type { Meta, StoryObj } from '@storybook/react';

import { HeaderAuth } from '.';

const meta = {
  title: 'Layouts/HeaderAuth',
  tags: ['autodocs'],

  component: HeaderAuth,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HeaderAuth>;

export default meta;
type Story = StoryObj<typeof HeaderAuth>;

export const Default: Story = {
  args: {},
};
