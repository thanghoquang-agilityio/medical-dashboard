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
const Pagination = memo(({ total, initialPage, onChange }: PaginationProps) => (
  <PaginationNextUI
    classNames={{
      cursor: 'bg-linear-success',
      item: cn('active:text-black-violet ', itemClass),
      prev: cn(itemClass, 'data-[disabled=true]:opacity-40'),
      next: cn(itemClass, 'data-[disabled=true]:opacity-40'),
    }}
    showControls
    total={total}
    initialPage={initialPage}
    onChange={onChange}
  />
));

Pagination.displayName = 'Pagination';
export default Pagination;
