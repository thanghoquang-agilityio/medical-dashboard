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
          '!bg-transparent hover:!bg-transparent focus:!bg-transparent focus:border-secondary-300 group-data-[invalid=true]:border-danger-100',
        ),
        innerWrapper:
          'group-data-[invalid=true]:border-danger-100 group-data-[invalid=true]:text-danger-100',
        input:
          'text-primary-100 placeholder:text-primary-300 bg-transparent text-sm mx-2 data-[focus=true]:!bg-transparent group-data-[invalid=true]:text-danger-100',
        errorMessage: 'text-danger-100 text-xs ml-2',
        label: 'top-[13px] text-sm group-data-[invalid=true]:text-danger-100',
        segment:
          'focus:bg-primary-100 focus:bg-opacity-20 group-data-[invalid=true]:text-danger-100',
      },
    },
    size: {
      sm: {
        base: 'h-[86px] gap-[3px]',
        inputWrapper: 'h-auto py-3 max-h-10',
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
    size: 'sm',
    border: 'default',
  },
});
