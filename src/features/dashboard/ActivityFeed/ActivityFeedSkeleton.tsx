import { memo } from 'react';
import { PAGE_SIZE_DEFAULT } from '@/constants';
import { Card, Skeleton } from '@nextui-org/react';
import { Text } from '@/components/ui';

export const ActivityFeedListSkeleton = memo(() => (
  <div
    className="flex flex-col w-full items-center pt-4"
    data-testid="activity-feed-list-skeleton"
  >
    {Array(PAGE_SIZE_DEFAULT)
      .fill(0)
      .map((_, index) => (
        <div
          key={`activity-feed-skeleton-${index}`}
          className="flex w-full h-[60px] justify-between"
        >
          <Skeleton className="min-w-10 w-10 h-10 rounded-full" />
          <div className="flex flex-col w-full ml-2 mr-8 gap-1">
            <Skeleton className="w-full h-5 rounded-large" />
            <Skeleton className="w-20 h-5 rounded-large" />
          </div>

          <Skeleton className="w-16 h-7 rounded-small mt-3" />
        </div>
      ))}
    <Skeleton className="w-[160px] h-8 rounded-medium mt-6" />
  </div>
));

ActivityFeedListSkeleton.displayName = 'ActivityFeedListSkeleton';

export const ActivityFeedSkeleton = memo(() => (
  <Card className="bg-background-200 p-4 md:pl-7 w-full">
    <Text variant="title" size="lg" customClass="leading-9">
      Activity Feed
    </Text>

    <ActivityFeedListSkeleton />
  </Card>
));

ActivityFeedSkeleton.displayName = 'ActivityFeedSkeleton';
