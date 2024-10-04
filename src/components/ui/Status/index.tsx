import { memo } from 'react';
import { cn } from '@/utils';

// Components
import { AppointmentStatus } from '@/types';

const COLOR_STATUS = {
  0: 'bg-success text-success',
  1: 'bg-warning text-warning',
  2: 'bg-danger-100 text-danger-100',
  3: 'bg-secondary-200 text-secondary-200',
};

const STATUS = {
  0: 'New',
  1: 'Meeting',
  2: 'Cancelled',
  3: 'Done',
};

export const Status = memo(
  ({
    status,
    className,
  }: {
    status: AppointmentStatus;
    className?: string;
  }) => (
    <div
      className={cn(
        `${COLOR_STATUS[status]} bg-opacity-20 w-fit max-w-20 px-2 rounded-md text-center ${className ?? ''}`,
      )}
    >
      <p className="text-2xs font-semibold">{STATUS[status]}</p>
    </div>
  ),
);

Status.displayName = 'Status';
