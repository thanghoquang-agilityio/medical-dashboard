// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Image } from '.';
import { SRC_BANNER_HEADPHONE } from '@/constants';

const meta = {
  title: 'Components/Image',
  tags: ['autodocs'],
  component: Image,
  argTypes: {
    className: {
      description: 'Class of custom image',
    },
    src: {
      description: 'Source of custom image',
    },
    width: {
      description: 'Width of custom image',
    },
    height: {
      description: 'Height of custom image',
    },
    alt: {
      description: 'Alt text of custom image',
    },
  },
} as Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SourceError: Story = {
  args: {
    className: 'rounded-md',
    src: '',
    width: 200,
    height: 150,
    alt: 'Image',
  },
};

export const SourceSuccess: Story = {
  args: {
    className: 'rounded-md',
    src: SRC_BANNER_HEADPHONE,
    width: 200,
    height: 150,
    alt: 'Image',
  },
};
