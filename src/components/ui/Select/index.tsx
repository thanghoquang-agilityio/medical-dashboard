'use client';

import type { SelectProps as SelectNextUiProps } from '@nextui-org/react';
import { cn, SelectItem, Select as SelectNextUi } from '@nextui-org/react';
import { forwardRef } from 'react';

// Types
import { Option } from '@/types';

interface SelectProps extends Omit<SelectNextUiProps, 'children'> {
  options: Option[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { options, value, placeholder = ' ', classNames, ...rest },
    ref,
  ): JSX.Element => (
    <SelectNextUi
      {...rest}
      ref={ref}
      labelPlacement="outside"
      value={value}
      placeholder={placeholder}
      classNames={{
        mainWrapper: classNames?.mainWrapper,
        base: classNames?.base,
        label: cn(
          'text-primary-100 text-xs font-medium',
          'group-data-[filled=true]:text-primary-100 after:text-primary-100',
          classNames?.label,
        ),
        value: cn(
          `text-xs`,
          value
            ? 'text-primary-300 font-medium'
            : 'text-primary-100 font-medium',
          classNames?.value,
        ),
        trigger: cn(
          'px-2.5 py-2 h-[46px] rounded-medium',
          'bg-background-100 shadow-stack border-1 outline-offset-0',
          'data-[focus=true]:border-green data-[focus=true]:border-1 data-[focus=true]:bg-background-100',
          'data-[hover=true]:bg-background-100',
          'group-data-[invalid=true]:border-red',
          classNames?.trigger,
        ),
        innerWrapper: cn('text-xs leading-[18px]', classNames?.innerWrapper),
        selectorIcon: cn('text-primary-100', classNames?.selectorIcon),
        popoverContent: cn(
          'bg-background-100 w-full rounded-lg',
          classNames?.popoverContent,
        ),
        errorMessage: cn('text-danger text-sm ml-2', classNames?.errorMessage),
      }}
    >
      {options.map(({ key, label }) => (
        <SelectItem
          key={key}
          classNames={{
            base: cn(
              'bg-background-100 data-[hover=true]:bg-primary-100 data-[selectable=true]:focus:bg-primary-100 w-full',
              'text-primary-100 data-[hover=true]:text-background-100 data-[selectable=true]:focus:text-background-100',
            ),
            title: 'text-xs',
          }}
        >
          {label}
        </SelectItem>
      ))}
    </SelectNextUi>
  ),
);

Select.displayName = 'Select';
