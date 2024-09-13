import type { Meta, StoryObj } from '@storybook/react';

import { Select } from '.';

const animals = [
  {
    key: 'cat',
    label: 'Cat',
  },
  {
    key: 'dog',
    label: 'Dog',
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
      <div className="w-[200px] p-4 bg-purple-shiny">
        <Story />
      </div>
    ),
  ],

  args: {
    options: animals,
    placeholder: 'Month',
  },
};
