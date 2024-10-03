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
      default: 'bg-transparent text-primary-100',
      primary: 'bg-linear-success text-content1',
      secondary: 'bg-linear-danger text-content1',
      red: 'text-red',
      stone: 'text-primary-200',
      green: 'text-green',
      outline: 'text-secondary-300',
    },

    isIconOnly: {
      true: 'bg-none',
      ariaLabel: 'Button Icon',
    },

    size: {
      tiny: 'w-6 max-h-6 h-6',
      xs: 'px-3 text-sm max-h-10 h-10 gap-1 text-sm rounded-lg',
      md: 'px-4 min-w-20 max-h-10 h-10 text-small gap-2 rounded-small',
      lg: 'w-full max-h-12 h-12 text-small gap-2 rounded-small',
    },
  },
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
  },
});
