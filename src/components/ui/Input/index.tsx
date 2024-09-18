'use client';

import { cn } from '@/utils';
import { extendVariants, Input as NextUIInput } from '@nextui-org/react';

export const Input = extendVariants(NextUIInput, {
  variants: {
    color: {
      default: {
        inputWrapper: cn(
          'bg-transparent border-text-foreground',
          '!bg-transparent data-[hover=true]:!bg-transparent group-data-[focus=true]:!bg-transparent',
        ),
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
