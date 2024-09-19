import { memo } from 'react';

// Components
import { Text } from '..';

const COLOR_STATUS = {
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-danger-100',
};

const STATUS = {
  success: 'New',
  warning: 'Meeting',
  error: 'Cancelled',
};

export const Status = memo(
  ({
    status,
    className,
  }: {
    status: 'success' | 'warning' | 'error';
    className?: string;
  }) => (
    <div
      className={`${COLOR_STATUS[status]} bg-opacity-20 w-fit max-w-20 px-2 rounded-md text-center ${className}`}
    >
      <Text variant={status} size="2xs" customClass="font-semibold">
        {STATUS[status]}
      </Text>
    </div>
  ),
);

Status.displayName = 'Status';
