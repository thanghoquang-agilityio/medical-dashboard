'use client';

import { Key, memo } from 'react';
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
  DropdownProps,
} from '@nextui-org/react';

// Components
import { Text } from '../Text';

// Utils
import { cn } from '@/utils';

// Types
import { Option } from '@/types';

interface MenuOptions extends Option {
  startContent?: JSX.Element;
}

interface MenuDropdownProps extends Omit<DropdownProps, 'children'> {
  label?: string;
  options: MenuOptions[];
  icon: JSX.Element;
  onAction: (key: Key) => void;
}

export const MenuDropdown = memo(
  ({
    options,
    label,
    icon,
    classNames,
    onAction,
    ...rest
  }: MenuDropdownProps) => (
    <Dropdown
      {...rest}
      classNames={{
        trigger: cn(
          'text-primary-100 rounded-lg bg-background-100 border-1',
          'data-[focus=true]:border-primary data-[focus=true]:border-1',
          classNames?.trigger,
        ),
        content: cn('rounded-lg bg-background-100', classNames?.content),
      }}
    >
      <DropdownTrigger>
        <Button className="flex gap-4 items-center">
          <div className="text-primary-100 max-h-6 max-w-6">{icon}</div>
          {label && (
            <Text variant="title" size="xs">
              {label}
            </Text>
          )}
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
        onAction={onAction}
      >
        {options.map(({ key, label, startContent }) => (
          <DropdownItem key={key} startContent={startContent}>
            {label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  ),
);

MenuDropdown.displayName = 'MenuDropdown';
