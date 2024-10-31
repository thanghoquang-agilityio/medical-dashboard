import { memo } from 'react';
import {
  Pagination as PaginationNextUI,
  PaginationProps,
} from '@nextui-org/react';
import { cn } from '@/utils';

const itemClass = cn(
  'text-primary-100',
  'bg-default [&[data-hover=true]:not([data-active=true])]:opacity-70',
);
const Pagination = memo(
  ({ total, initialPage, classNames, onChange }: PaginationProps) => (
    <PaginationNextUI
      classNames={{
        cursor: 'hidden',
        item: cn(
          'data-[active=true]:bg-linear-success data-[active=true]:text-white cursor-pointer',
          itemClass,
        ),
        prev: cn(
          itemClass,
          'hidden md:flex data-[disabled=true]:opacity-40 cursor-pointer',
        ),
        next: cn(
          itemClass,
          'hidden md:flex data-[disabled=true]:opacity-40 cursor-pointer',
        ),
        ...classNames,
      }}
      showControls
      total={total}
      initialPage={initialPage}
      onChange={onChange}
    />
  ),
);

Pagination.displayName = 'Pagination';
export default Pagination;
