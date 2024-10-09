'use client';

import { memo } from 'react';
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
  DropdownProps,
  DropdownMenuProps,
} from '@nextui-org/react';

// Components
import { Text } from '../Text';

// Utils
import { cn } from '@/utils';

// Types
import { Option } from '@/types';

export interface MenuOption extends Option {
  startContent?: JSX.Element;
  isDisabled?: boolean;
}

interface MenuDropdownProps
  extends Omit<DropdownProps & DropdownMenuProps, 'children'> {
  label?: string;
  options: MenuOption[];
  icon: JSX.Element;
}

export const MenuDropdown = memo(
  ({
    options,
    label,
    icon,
    classNames,
    onAction,
    ...rest
  }: MenuDropdownProps) => {
    const disabledKeys = options
      .filter(({ isDisabled }) => isDisabled)
      .map(({ key }) => key);

    return (
      <Dropdown
        {...rest}
        classNames={{
          trigger: cn(
            'text-primary-100 rounded-lg bg-background-100 border-1',
            'data-[focus=true]:border-primary data-[focus=true]:border-1',
            classNames?.trigger,
          ),
          content: cn('rounded-lg bg-background-100', classNames?.content),
          base: classNames?.base,
        }}
      >
        <DropdownTrigger>
          <Button
            aria-label="Dropdown button"
            className="flex gap-3 items-center"
          >
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
              'text-primary-100 data-[hover=true]:text-background-100 data-[selectable=true]:focus:text-background-100 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:pointer-events-auto',
            ),
          }}
          disabledKeys={disabledKeys}
          onAction={onAction}
        >
          {options.map(({ key, label, startContent }) => (
            <DropdownItem key={key} startContent={startContent}>
              {label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  },
);

MenuDropdown.displayName = 'MenuDropdown';
