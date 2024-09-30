'use client';

import {
  extendVariants,
  TimeInput as TimeInputNextUI,
} from '@nextui-org/react';

// Utils
import { cn } from '@/utils';

export const TimeInput = extendVariants(TimeInputNextUI, {
  variants: {
    color: {
      default: {
        inputWrapper: cn(
          'bg-transparent border-text-foreground',
          '!bg-transparent hover:!bg-transparent focus:!bg-transparent focus:border-secondary-300 group-data-[invalid=true]:border-red',
        ),
        input:
          'text-primary-100 placeholder:text-primary-300 bg-transparent text-md mx-2 data-[focus=true]:!bg-transparent',
        errorMessage: 'text-danger-100 text-sm ml-2',
        label: 'top-[20px]',
        segment: 'focus:bg-primary-100 focus:bg-opacity-20',
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
