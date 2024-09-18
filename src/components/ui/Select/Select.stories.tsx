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
  args: {
    options: animals,
    placeholder: 'Month',
    classNames: { mainWrapper: 'w-[200px]' },
  },
};
