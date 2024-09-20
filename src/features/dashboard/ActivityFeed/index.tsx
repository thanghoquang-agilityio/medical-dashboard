'use client';
import { memo } from 'react';
import dynamic from 'next/dynamic';

// Types
import {
  APIRelatedResponse,
  APIResponse,
  AppointmentModel,
  ColumnType,
  MetaResponse,
  NotificationModel,
  NotificationResponse,
  Option,
  STATUS_TYPE_RESPONSE,
  UserModel,
} from '@/types';

// Components
import { Avatar, Select, Status, Text } from '@/components/ui';
import { formatDateTime, formatTimeAgo, getContentNotification } from '@/utils';
import { Card } from '@nextui-org/react';
const DataGrid = dynamic(() => import('@/components/ui/DataGrid'));

const ActivityInfo = ({ item }: { item: NotificationModel }) => {
  // TODO: Update user id in zustand
  const userId = '1';

  const {
    senderAvatar = '',
    createdAt = '',
    info = {} as AppointmentModel,
    senderId = {} as APIRelatedResponse<APIResponse<UserModel>>,
    type = 0,
  } = item || {};
  const { startTime = '' } = info as AppointmentModel;

  const time = formatDateTime(startTime);
  const content = getContentNotification({ userId, senderId, time, type });

  const timeAgo = formatTimeAgo(createdAt);

  return (
    <div className="flex gap-2 justify-items-start mb-6">
      <Avatar src={senderAvatar} size="md" hasBorder color="warning" />
      <div className={`flex flex-col`}>
        <Text size="xs" variant="description">
          {content}
        </Text>
        <Text variant="subTitle" size="2xs">
          {timeAgo}
        </Text>
      </div>
    </div>
  );
};

const COLUMNS_ACTIVITY_FEED: ColumnType<NotificationModel>[] = [
  {
    key: 'sender',
    title: 'Sender',
    customNode: (_, item) => <ActivityInfo item={item} />,
  },
  {
    key: 'status',
    title: 'Status',
    customNode: (_, item) => {
      const { info } = item || {};
      const { status } = info || {};

      return (
        <Status
          status={STATUS_TYPE_RESPONSE[status]}
          className="leading-[27px] mb-6"
        />
      );
    },
  },
];

const OPTION_ACTIVITY_FEED: Option[] = [{ key: 'all', label: 'All Activity' }];

interface ActivityFeedProps extends MetaResponse {
  notifications: NotificationResponse[];
}

const ActivityFeed = memo(
  ({ notifications, pagination }: ActivityFeedProps) => {
    return (
      <Card className="bg-background-200 py-4 pr-3 pl-7 m-10 w-[600px] h-fit">
        <div className="flex justify-between z-20 items-center">
          <Text variant="title" size="lg">
            Activity Feed
          </Text>
          <Select
            options={OPTION_ACTIVITY_FEED}
            defaultSelectedKeys={[OPTION_ACTIVITY_FEED[0].key]}
            isDisabled={true}
            classNames={{
              base: 'max-w-[102px] max-h-[36px]',
              mainWrapper: 'max-w-[102px] max-h-[36px]',
              innerWrapper: 'w-[80px]',
              trigger: 'min-h-[36px]',
            }}
          />
        </div>
        <DataGrid
          data={notifications}
          pagination={pagination}
          columns={COLUMNS_ACTIVITY_FEED as ColumnType<unknown>[]}
          classWrapper="p-0 pt-4"
          classCell="p-0"
          classRow="h-[60px]"
        />
      </Card>
    );
  },
);

ActivityFeed.displayName = 'ActivityFeed';
export default ActivityFeed;
