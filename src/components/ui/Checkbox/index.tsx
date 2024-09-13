'use client';

import { extendVariants, Checkbox as NextUICheckbox } from '@nextui-org/react';

export const Checkbox = extendVariants(NextUICheckbox, {
  variants: {
    color: {
      primary: {
        wrapper: ['after:bg-emerald'],
        icon: 'text-white',
      },
    },
    size: {
      md: {
        label: 'text-base text-neutral',
        wrapper: ['w-5 h-5', 'before:border'],
      },
    },
    radius: {
      sm: {
        wrapper: ['rounded', 'before:rounded', 'after:rounded'],
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    radius: 'sm',
  },
});
