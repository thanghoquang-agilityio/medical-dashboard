import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/components/ui';
import { EmailIcon, SearchIcon } from '@/icons';

const meta = {
  title: 'Components/Input',
  tags: ['autodocs'],

  component: Input,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const InputDefault: Story = {
  args: {
    color: 'default',
    size: 'sm',
    border: 'default',
    className: 'w-[380px]',
  },
};

export const InputSmall: Story = {
  args: {
    color: 'default',
    size: 'sm',
    border: 'default',
    className: 'w-[380px]',
    placeholder: 'email address',
    startContent: <EmailIcon customClass="w-6 h-6 ml-4 text-primary-200" />,
  },
};

export const InputMedium: Story = {
  args: {
    color: 'default',
    size: 'md',
    border: 'default',
    className: 'w-[380px]',
    placeholder: 'email address',
    startContent: <EmailIcon customClass="w-6 h-6 ml-4 text-primary-200" />,
  },
};

export const InputWithStartContent: Story = {
  args: {
    color: 'default',
    size: 'sm',
    border: 'default',
    className: 'w-[380px]',
    placeholder: 'email address',
    startContent: <EmailIcon customClass="w-6 h-6 ml-4 text-primary-200" />,
  },
};

export const InputDisabled: Story = {
  args: {
    color: 'default',
    size: 'md',
    placeholder: 'Search Chemists',
    className: 'w-[380px]',
    border: 'default',
    isDisabled: true,
    startContent: <SearchIcon customClass="w-6 h-6 ml-4 text-primary-200" />,
  },
};

export const InputWithErrorMessage: Story = {
  args: {
    color: 'default',
    size: 'sm',
    className: 'w-[380px]',
    isInvalid: true,
    errorMessage: 'Please enter a valid email address',
    border: 'default',
    placeholder: 'email address',
    startContent: <EmailIcon customClass="w-6 h-6 ml-2 text-primary-200" />,
  },
};
