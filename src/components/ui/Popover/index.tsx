import {
  Popover as PopoverNextUI,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';

interface PopoverProps {
  popoverTrigger: React.ReactNode;
  popoverContent: React.ReactNode;
  placement?:
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end';
  className?: string;
}

export const Popover = ({
  popoverTrigger,
  popoverContent,
  placement = 'bottom',
  className = '',
}: PopoverProps) => (
  <PopoverNextUI placement={placement} offset={4}>
    <PopoverTrigger>{popoverTrigger}</PopoverTrigger>
    <PopoverContent className={className}>{popoverContent}</PopoverContent>
  </PopoverNextUI>
);

Popover.displayName = 'Popover';
