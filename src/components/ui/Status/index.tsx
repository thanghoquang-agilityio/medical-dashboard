import { memo } from 'react';
import { cn } from '@/utils';

import { AppointmentStatus } from '@/types';

const COLOR_STATUS = {
  0: 'bg-success text-white dark:text-success',
  1: 'bg-warning text-white dark:text-warning',
  2: 'bg-danger-100 text-white dark:text-danger-300',
  3: 'bg-secondary-200 text-white dark:text-secondary-200',
};
export const STATUS = {
  0: 'new',
  1: 'meeting',
  2: 'cancelled',
  3: 'done',
};

export interface StatusProps {
  status: AppointmentStatus;
  className?: string;
}

export const Status = memo(({ status, className = '' }: StatusProps) => (
  <div
    className={cn(
      `${COLOR_STATUS[status]} dark:bg-opacity-20 w-[68px] px-2 rounded-md text-center ${className}`,
    )}
  >
    <p className="text-2xs font-semibold capitalize">{STATUS[status]}</p>
  </div>
));

Status.displayName = 'Status';
