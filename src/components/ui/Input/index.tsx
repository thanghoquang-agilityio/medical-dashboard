'use client';

import { cn } from '@/utils/styles';
import { extendVariants, Input as NextUIInput } from '@nextui-org/react';

export const Input = extendVariants(NextUIInput, {
  variants: {
    color: {
      default: {
        inputWrapper: cn(
          'bg-transparent border-text-foreground',
          '!bg-transparent data-[hover=true]:!bg-transparent group-data-[focus=true]:ring-0 group-data-[focus=true]:ring-offset-0 group-data-[focus=true]:!bg-transparent data-[focus=true]:border-secondary-300 group-data-[invalid=true]:border-danger-100',
        ),
        input:
          'text-primary-100 placeholder:text-primary-300 bg-transparent text-sm mx-2 group-data-[invalid=true]:!text-danger-100',
        errorMessage: 'text-danger-100 text-xs ml-2',
        label: 'top-5 text-sm group-data-[invalid=true]:!text-danger-100',
      },
    },
    size: {
      sm: {
        mainWrapper: 'h-[68px]',
        inputWrapper: 'h-auto py-3 max-h-10',
        input: 'mx-1',
        label: 'top-[20px]',
      },
      md: {
        mainWrapper: 'h-20',
        inputWrapper: 'h-auto py-4',
        label: 'top-[20px]',
      },
      lg: {
        mainWrapper: 'h-24',
        inputWrapper: 'h-auto py-5',
        label: 'top-[20px]',
      },
    },
    border: {
      default: {
        inputWrapper: 'border',
        label: 'top-[20px]',
      },
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'md',
    border: 'default',
  },
});
