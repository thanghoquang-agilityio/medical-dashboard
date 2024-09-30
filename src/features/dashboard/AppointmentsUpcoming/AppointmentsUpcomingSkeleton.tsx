import { memo } from 'react';
import {
  APPOINTMENT_STATUS_OPTIONS,
  PAGE_LIMIT_APPOINTMENTS_UPCOMING,
} from '@/constants';
import { Card, Skeleton } from '@nextui-org/react';
import { Select, Text } from '@/components/ui';

export const AppointmentsUpcomingListSkeleton = memo(() => (
  <div className="flex flex-col items-center pt-4">
    {Array(PAGE_LIMIT_APPOINTMENTS_UPCOMING)
      .fill(0)
      .map((_, index) => (
        <div
          key={`activity-feed-skeleton-${index}`}
          className="flex w-full justify-between items-center h-12"
        >
          <Skeleton className="min-w-9 w-9 h-10 rounded-medium" />
          <div className="flex lg:flex-col flex-row justify-around w-full ml-2 mr-6 gap-0.5">
            <Skeleton className="w-20 h-4 rounded-large" />
            <Skeleton className="w-28 h-4 rounded-large" />
          </div>

          <Skeleton className="w-7 h-7 rounded-small" />
        </div>
      ))}
  </div>
));

AppointmentsUpcomingListSkeleton.displayName =
  'AppointmentsUpcomingListSkeleton';

export const AppointmentsUpcomingSkeleton = memo(() => (
  <Card className="w-full lg:max-w-[320px] h-fit p-4 pl-5 bg-background-200">
    <div className="flex justify-between items-center">
      <Text customClass="text-lg font-bold text-primary-100">Appointments</Text>
      <div>
        <Select
          aria-label="appointment status"
          options={APPOINTMENT_STATUS_OPTIONS}
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
));

AppointmentsUpcomingSkeleton.displayName = 'AppointmentsUpcomingSkeleton';
