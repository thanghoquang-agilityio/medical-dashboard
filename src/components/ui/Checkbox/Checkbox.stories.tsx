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
export const Primary: Story = {
  args: {
    children: 'Remember Me',
  },
};
