import type { Meta, StoryObj } from '@storybook/react';

import { Footer } from '@/components/layouts';

const meta = {
  title: 'Layouts/Footer',
  tags: ['autodocs'],

  component: Footer,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof Footer>;

export const FooterDefault: Story = {
  decorators: [
    (Story) => (
      <div className="w-[1400px]">
        <Story />
      </div>
    ),
  ],

  args: {},
};

export const FooterTablet: Story = {
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],

  args: {},
};

export const FooterMobile: Story = {
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],

  args: {},
};
