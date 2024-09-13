'use client';

import { extendVariants, Button as ButtonNextUI } from '@nextui-org/react';

export const Button = extendVariants(ButtonNextUI, {
  variants: {
    variant: {
      solid: 'border-transparent font-semibold',
      outline:
        'border-1 border-secondary-300 hover:bg-secondary-300 hover:text-primary-100',
    },

    color: {
      default: 'bg-transparent text-secondary-300',
      primary: 'bg-linear-success text-primary-100',
      secondary: 'bg-linear-danger text-primary-100',
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
