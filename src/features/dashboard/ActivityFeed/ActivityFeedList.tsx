'use client';

import { lazy, memo, useTransition } from 'react';
import { Card } from '@nextui-org/react';

// Types
import {
  APIRelatedResponse,
  APIResponse,
  ColumnType,
  InfoModel,
  MetaResponse,
  NotificationModel,
  NotificationResponse,
  UserModel,
} from '@/types';

// Components
import { Avatar, Status, Text } from '@/components/ui';
import {
  formatDateTime,
  fromDateToNow,
  getDescriptionNotification,
} from '@/utils';

import { ActivityFeedListSkeleton } from './ActivityFeedSkeleton';
const DataGrid = lazy(() => import('@/components/ui/DataGrid'));

interface ActivityInfoProps {
  item: NotificationModel;
  userId?: string;
}

const ActivityInfo = memo(({ item, userId = '' }: ActivityInfoProps) => {
  const {
    senderAvatar = '',
    createdAt = '',
    info = {} as InfoModel,
    senderId = {} as APIRelatedResponse<APIResponse<UserModel>>,
  } = item || {};
  const { startTime = '', content } = info;

  const time = formatDateTime(startTime);
  const description = getDescriptionNotification({
    userId,
    senderId,
    time,
    content,
  });

  const timeAgo = fromDateToNow(createdAt);

  return (
    <div className="flex gap-3 justify-items-start ml-1">
      <Avatar isBordered src={senderAvatar} className="aspect-square" />
      <div className="flex flex-col mr-8">
        <Text variant="description" customClass="text-2xs md:text-xs text-wrap">
          {description}
        </Text>
        <Text variant="subTitle" size="2xs">
          {timeAgo}
        </Text>
      </div>
    </div>
  );
});

export const COLUMNS_ACTIVITY_FEED: ColumnType<NotificationModel>[] = [
  {
    key: 'sender',
    title: 'Sender',
  },
  {
    key: 'status',
    title: 'Status',
    customNode: ({ item }) => {
      const { info } = item || {};
      const { status = 0 } = info || {};

      return <Status status={status} className="leading-[27px] max-w-[70px]" />;
    },
  },
];
export interface ActivityFeedListProps extends MetaResponse {
  notifications: NotificationResponse[];
  userId: string;
}

const ActivityFeedList = memo(
  ({ userId, notifications, pagination }: ActivityFeedListProps) => {
    const [isPending, startTransition] = useTransition();

    return (
      <Card className="bg-background-200 h-fit w-full p-4 md:py-5">
        <Text variant="title" size="lg" customClass="leading-9">
          Activity Feed
        </Text>
        {isPending ? (
          <ActivityFeedListSkeleton />
        ) : (
          <div className="flex flex-col items-center">
            <DataGrid
              id="activity-feed"
              data={notifications}
              pagination={pagination}
              startTransition={startTransition}
              columns={
                COLUMNS_ACTIVITY_FEED.map((column) => ({
                  ...column,
                  customNode: ({ item }) =>
                    column.key === 'sender' ? (
                      <ActivityInfo
                        item={item as NotificationModel}
                        userId={userId}
                      />
                    ) : column.customNode ? (
                      column.customNode({
                        column,
                        item: item as NotificationModel,
                      })
                    ) : null,
                })) as ColumnType<unknown>[]
              }
              classWrapper="pt-4"
              classCell="pb-6"
            />
          </div>
        )}
      </Card>
    );
  },
);

ActivityFeedList.displayName = 'ActivityFeedList';
ActivityInfo.displayName = 'ActivityInfo';
export default ActivityFeedList;
