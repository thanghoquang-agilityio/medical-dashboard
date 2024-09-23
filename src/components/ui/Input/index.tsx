'use client';

import { cn } from '@/utils';
import { extendVariants, Input as NextUIInput } from '@nextui-org/react';

export const Input = extendVariants(NextUIInput, {
  variants: {
    color: {
      default: {
        inputWrapper: cn(
          'bg-transparent border-text-foreground',
          '!bg-transparent data-[hover=true]:!bg-transparent group-data-[focus=true]:!bg-transparent data-[focus=true]:border-secondary-300 group-data-[invalid=true]:border-red',
        ),
        input:
          'text-primary-100 placeholder:text-primary-300 bg-transparent text-md mx-2',
        errorMessage: 'text-danger text-sm ml-2',
      },
    },
    size: {
      sm: {
        mainWrapper: 'h-16',
        inputWrapper: 'h-auto py-3',
      },
      md: {
        mainWrapper: 'h-20',
        inputWrapper: 'h-auto py-4',
      },
      lg: {
        mainWrapper: 'h-24',
        inputWrapper: 'h-auto py-5',
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
