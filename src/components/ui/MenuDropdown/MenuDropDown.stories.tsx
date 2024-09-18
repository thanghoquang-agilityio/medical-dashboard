import type { Meta, StoryObj } from '@storybook/react';

import { MenuDropdown } from '.';

const options = [
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
  title: 'Components/MenuDropdown',
  tags: ['autodocs'],

  component: MenuDropdown,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MenuDropdown>;

export default meta;
type Story = StoryObj<typeof MenuDropdown>;

export const MenuDropdownDefault: Story = {
  args: {
    label: 'Month',
    options: options,
  },
};
