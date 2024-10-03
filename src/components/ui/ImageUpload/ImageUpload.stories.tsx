import type { Meta, StoryObj } from '@storybook/react';

import { ImageUpload } from '@/components/ui';

const meta = {
  title: 'Components/ImageUpload',
  tags: ['autodocs'],

  component: ImageUpload,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ImageUpload>;

export default meta;
type Story = StoryObj<typeof ImageUpload>;

export const ImageUploadDefault: Story = {
  args: {
    src: '',
    altText: 'Image Upload Default',
  },
};

export const ImageUploadHasValue: Story = {
  args: {
    src: 'https://medical-dashboard-api.onrender.com/uploads/kyle_554a95ac44.webp',
    altText: 'Image Upload Value',
  },
};
