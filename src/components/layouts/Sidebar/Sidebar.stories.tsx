import type { Meta, StoryObj } from '@storybook/react';

import { Sidebar } from '.';

const meta = {
  title: 'Layouts/Sidebar',
  tags: ['autodocs'],

  component: Sidebar,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const MenuDropdownDefault: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-[900px] bg-purple-shiny">
        <Story />
      </div>
    ),
  ],
};
