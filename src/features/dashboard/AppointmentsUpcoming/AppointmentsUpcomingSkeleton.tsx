import { memo } from 'react';
import { cn } from '@/utils';
import {
  APPOINTMENT_STATUS_OPTIONS,
  PAGE_LIMIT_APPOINTMENTS_UPCOMING,
} from '@/constants';
import { Card, Skeleton } from '@nextui-org/react';
import { Select, Text } from '@/components/ui';

export const AppointmentsUpcomingListSkeleton = memo(() => (
  <div className="flex flex-col w-full items-center pt-4">
    {Array(PAGE_LIMIT_APPOINTMENTS_UPCOMING)
      .fill(0)
      .map((_, index) => (
        <div
          key={`activity-feed-skeleton-${index}`}
          className={cn(
            'flex w-full justify-between items-center h-12',
            index !== PAGE_LIMIT_APPOINTMENTS_UPCOMING - 1 && 'mb-1',
          )}
        >
          <Skeleton className="min-w-10 w-10 h-10 rounded-medium" />
          <div className="flex lg:flex-col flex-row justify-around w-full mx-6 2xl:ml-[72px] gap-0.5">
            <Skeleton className="w-20 h-4 rounded-large" />
            <Skeleton className="w-32 h-4 rounded-large" />
          </div>

          <Skeleton className="w-10 h-7 rounded-small" />
        </div>
      ))}
  </div>
));

AppointmentsUpcomingListSkeleton.displayName =
  'AppointmentsUpcomingListSkeleton';

export const AppointmentsUpcomingSkeleton = memo(
  ({ defaultStatus }: { defaultStatus: string }) => (
    <Card className="w-full lg:max-w-[320px] 2xl:max-w-[550px] h-fit p-4 pl-5 bg-background-200">
      <div className="flex justify-between items-center">
        <Text customClass="text-lg font-bold text-primary-100">
          Appointments
        </Text>
        <div>
          <Select
            aria-label="appointment status"
            options={APPOINTMENT_STATUS_OPTIONS}
            defaultSelectedKeys={[defaultStatus]}
            selectedKeys={[defaultStatus]}
            placeholder="Status"
            classNames={{
              base: 'max-w-[102px] max-h-[36px]',
              mainWrapper: 'max-w-[102px] max-h-[36px]',
              innerWrapper: 'w-[80px]',
              trigger: 'min-h-[36px]',
            }}
            isDisabled={true}
          />
        </div>
      </div>
      <AppointmentsUpcomingListSkeleton />
    </Card>
  ),
);

AppointmentsUpcomingSkeleton.displayName = 'AppointmentsUpcomingSkeleton';
