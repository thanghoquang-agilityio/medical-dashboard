import {
  Popover as PopoverNextUI,
  PopoverContent,
  PopoverTrigger,
  PopoverProps,
} from '@nextui-org/react';

interface Props extends Omit<PopoverProps, 'children'> {
  popoverTrigger: React.ReactNode;
  popoverContent: React.ReactNode;
}

export const Popover = ({
  popoverTrigger,
  popoverContent,
  placement = 'bottom',
  classNames,
}: Props) => (
  <PopoverNextUI placement={placement} offset={4} classNames={classNames}>
    <PopoverTrigger>{popoverTrigger}</PopoverTrigger>
    <PopoverContent>{popoverContent}</PopoverContent>
  </PopoverNextUI>
);

Popover.displayName = 'Popover';
