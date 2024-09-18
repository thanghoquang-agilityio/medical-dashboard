import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Checkbox } from '.';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;
export const Default: Story = {
  args: {
    children: 'Remember Me',
  },
};

export const Disable: Story = {
  args: {
    children: 'Remember Me',
    isDisabled: true,
  },
};
