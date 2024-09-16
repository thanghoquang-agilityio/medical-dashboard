import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from '.';

const meta = {
  title: 'Components/Spinner',
  tags: ['autodocs'],

  component: Spinner,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof Spinner>;

export const SpinnerSmall: Story = {
  args: {
    size: 'sm',
  },
};

export const SpinnerMedium: Story = {
  decorators: [
    (Story) => (
      <div className="h-[50px]">
        <Story />
      </div>
    ),
  ],
  args: {
    size: 'md',
  },
};

export const SpinnerLarge: Story = {
  decorators: [
    (Story) => (
      <div className="h-[70px]">
        <Story />
      </div>
    ),
  ],
  args: {
    size: 'lg',
  },
};
