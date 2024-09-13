'use client';

import { extendVariants, Button as ButtonNextUI } from '@nextui-org/react';

export const Button = extendVariants(ButtonNextUI, {
  variants: {
    variant: {
      solid: 'border-transparent font-semibold',
      outline:
        'border-1 border-secondary-300 hover:bg-linear-success hover:text-content1 font-semibold',
    },

    color: {
      default: 'bg-transparent text-secondary-300',
      primary: 'bg-linear-success text-content1',
      secondary: 'bg-linear-danger text-content1',
      red: 'text-red',
      stone: 'text-primary-200',
      green: 'text-green',
    },

    isIconOnly: {
      true: 'bg-none',
    },

    size: {
      tiny: 'w-6 h-6',
      xs: 'px-3 text-sm h-10 gap-1 text-sm rounded-lg',
      md: 'px-4 min-w-20 h-10 text-small gap-2 rounded-small',
    },
  },
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'xs',
  },
});
