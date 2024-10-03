import { memo } from 'react';
import { APPOINTMENT_STATUS_OPTIONS, PAGE_SIZE_DEFAULT } from '@/constants';
import { Card, Skeleton } from '@nextui-org/react';
import { InputSearch, Select, Text } from '@/components/ui';

export const AppointmentsHistoryListSkeleton = memo(() => (
  <div className="flex flex-col w-full items-center pt-4">
    {Array(PAGE_SIZE_DEFAULT)
      .fill(0)
      .map((_, index) => (
        <div
          key={`appointment-history-${index}`}
          className="flex w-full h-14 justify-between items-center"
        >
          <div className="flex flex-row gap-1 items-center">
            <Skeleton className="min-w-10 w-10 h-10 rounded-full" />
            <Skeleton className="w-20 h-5 rounded-large" />
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Skeleton className="min-w-10 w-10 h-10 rounded-full" />
            <Skeleton className="w-20 h-5 rounded-large" />
          </div>
          <Skeleton className="w-32 h-5 rounded-large" />
          <Skeleton className="w-20 h-5 rounded-large" />
          <Skeleton className="w-12 h-5 rounded-small" />
        </div>
      ))}
    <Skeleton className="w-[160px] h-8 rounded-medium mt-4" />
  </div>
));

AppointmentsHistoryListSkeleton.displayName = 'AppointmentsHistoryListSkeleton';

export const AppointmentsHistorySkeleton = memo(() => (
  <>
    <InputSearch
      placeholder="Search Appointments"
      classNames={{ mainWrapper: 'pb-10' }}
      isDisabled={true}
    />
    <Card className="w-full px-4 py-6 bg-background-200 mb-10">
      <div className="flex justify-between items-center">
        <Text customClass="text-xl font-bold text-primary-100">History</Text>
        <div>
          <Select
            aria-label="Status"
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

      <AppointmentsHistoryListSkeleton />
    </Card>
  </>
));

AppointmentsHistorySkeleton.displayName = 'AppointmentsHistorySkeleton';
