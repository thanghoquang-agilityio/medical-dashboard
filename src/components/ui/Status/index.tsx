import { memo } from 'react';
import { cn } from '@/utils';

import { AppointmentStatus } from '@/types';

const COLOR_STATUS = {
  0: 'bg-success text-success',
  1: 'bg-warning text-warning',
  2: 'bg-danger-100 text-danger-100',
  3: 'bg-secondary-200 text-secondary-200',
};
export const STATUS = {
  0: 'new',
  1: 'meeting',
  2: 'cancelled',
  3: 'done',
};

export const Status = memo(
  ({
    status,
    className = '',
  }: {
    status: AppointmentStatus;
    className?: string;
  }) => (
    <div
      className={cn(
        `${COLOR_STATUS[status]} bg-opacity-20 w-fit max-w-20 px-2 rounded-md text-center ${className ?? ''}`,
      )}
    >
      <p className="text-2xs font-semibold capitalize">{STATUS[status]}</p>
    </div>
  ),
);

Status.displayName = 'Status';
