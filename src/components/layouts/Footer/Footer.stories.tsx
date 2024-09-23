import type { Meta, StoryObj } from '@storybook/react';

import Footer from '.';

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
  args: {},
};
