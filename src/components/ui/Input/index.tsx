'use client';

import { extendVariants, Input as NextUIInput } from '@nextui-org/react';

export const Input = extendVariants(NextUIInput, {
  variants: {
    color: {
      default: {
        inputWrapper: 'bg-transparent border-text-foreground',
        input:
          'text-primary-100 placeholder:text-primary-300 bg-transparent text-sm mx-2',
        errorMessage: 'text-danger text-sm ml-2',
      },
    },
    size: {
      sm: {
        inputWrapper: 'h-auto py-3',
      },
      md: {
        inputWrapper: 'h-auto py-4 ',
      },
    },
    border: {
      default: {
        inputWrapper: 'border',
      },
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'md',
    border: 'default',
  },
});
