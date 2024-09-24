import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ErrorFallback } from '.';

const meta: Meta<typeof ErrorFallback> = {
  title: 'Components/ErrorFallback',
  component: ErrorFallback,
  argTypes: {
    message: {
      description: 'The error message to display',
    },
    reset: {
      description: 'The function to reset the page',
    },
  },
  args: {},
  parameters: {
    controls: {
      expanded: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ErrorFallback>;

export const Primary: Story = {};

export const WithMessage: Story = {
  args: {
    message: 'Sample error message',
  },
};
