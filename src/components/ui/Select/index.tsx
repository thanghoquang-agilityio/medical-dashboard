'use client';

import type { SelectProps as SelectNextUiProps } from '@nextui-org/react';
import { cn, SelectItem, Select as SelectNextUi } from '@nextui-org/react';
import { forwardRef } from 'react';

interface SelectOption {
  key: string;
  label: string;
}

interface SelectProps extends Omit<SelectNextUiProps, 'children'> {
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, value, placeholder = ' ', ...rest }, ref): JSX.Element => (
    <SelectNextUi
      {...rest}
      ref={ref}
      labelPlacement="outside"
      value={value}
      placeholder={placeholder}
      classNames={{
        label:
          'text-primary-100 text-xs font-medium group-data-[filled=true]:text-primary-100 after:text-primary-100',
        value: value
          ? 'text-primary-300 font-medium'
          : 'text-primary-100 font-medium',
        trigger: cn(
          'px-4 h-[46px] rounded-lg',
          'bg-background-100 shadow-stack border-1 outline-offset-0',
          'data-[focus=true]:outline-primary data-[focus=true]:outline-offset-0',
        ),
        selectorIcon: 'text-primary-100',
        popoverContent: 'bg-background-100 w-full rounded-lg',
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
          }}
        >
          {label}
        </SelectItem>
      ))}
    </SelectNextUi>
  ),
);

Select.displayName = 'Select';
