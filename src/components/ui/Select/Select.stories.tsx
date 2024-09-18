import type { Meta, StoryObj } from '@storybook/react';

import { Select } from '.';

const animals = [
  {
    key: 'Jan',
    label: 'January',
  },
  {
    key: 'Feb',
    label: 'February',
  },
];

const meta = {
  title: 'Components/Select',
  tags: ['autodocs'],

  component: Select,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const SelectDefault: Story = {
  decorators: [
    (Story) => (
      <div className="w-[200px] p-4 bg-background-200">
        <Story />
      </div>
    ),
  ],

  args: {
    options: animals,
    placeholder: 'Month',
  },
};
