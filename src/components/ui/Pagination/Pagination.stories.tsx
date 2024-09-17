import type { Meta, StoryObj } from '@storybook/react';

import Pagination from '.';

const meta = {
  title: 'Components/Pagination',
  tags: ['autodocs'],

  component: Pagination,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof Pagination>;

export const PaginationDefault: Story = {
  decorators: [
    (Story) => (
      <div className="p-4 bg-background-200">
        <Story />
      </div>
    ),
  ],

  args: {
    total: 10,
    initialPage: 1,
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
};
