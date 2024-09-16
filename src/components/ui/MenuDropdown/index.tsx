'use client';

import { memo } from 'react';
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
  DropdownProps,
} from '@nextui-org/react';

// Components
import { SortIcon } from '@/icons';
import { Text } from '../Text';

// Utils
import { cn } from '@/utils';

// Types
import { Option } from '@/types';

interface MenuDropdownProps extends Omit<DropdownProps, 'children'> {
  label: string;
  options: Option[];
}

export const MenuDropdown = memo(
  ({ options, label, ...rest }: MenuDropdownProps) => (
    <Dropdown
      {...rest}
      classNames={{
        trigger: cn(
          'text-primary-100 rounded-lg bg-background-100 border-1',
          'data-[focus=true]:border-primary data-[focus=true]:border-1',
        ),
        content: 'rounded-lg bg-background-100',
      }}
    >
      <DropdownTrigger>
        <Button className="flex gap-4 items-center">
          <div className="text-primary-100 h-6 w-6">
            <SortIcon />
          </div>
          <Text variant="title" size="xs">
            Sort By : {label}
          </Text>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Link Actions"
        itemClasses={{
          base: cn(
            'text-xs bg-background-100 data-[hover=true]:bg-primary-100 data-[selectable=true]:focus:bg-primary-100 w-full',
            'text-primary-100 data-[hover=true]:text-background-100 data-[selectable=true]:focus:text-background-100',
          ),
        }}
      >
        {options.map(({ key, label }) => (
          <DropdownItem key={key}>{label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  ),
);

MenuDropdown.displayName = 'MenuDropdown';
