import type { Meta, StoryObj } from '@storybook/react';

import { Navbar } from '.';

const meta = {
  title: 'Components/Navbar',
  tags: ['autodocs'],

  component: Navbar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof Navbar>;

export const MenuDropdownDefault: Story = {
  decorators: [
    (Story) => (
      <div className="w-[277px] p-4 bg-purple-shiny">
        <Story />
      </div>
    ),
  ],
};
