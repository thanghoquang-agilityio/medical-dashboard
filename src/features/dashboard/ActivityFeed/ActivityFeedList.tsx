'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@nextui-org/react';

// Types
import {
  APIRelatedResponse,
  APIResponse,
  AppointmentModel,
  ColumnType,
  MetaResponse,
  NotificationModel,
  NotificationResponse,
  STATUS_TYPE_RESPONSE,
  UserModel,
} from '@/types';

// Components
import { Avatar, Status, Text } from '@/components/ui';
import { formatDateTime, formatTimeAgo, getContentNotification } from '@/utils';
import { API_IMAGE_URL } from '@/constants';
const DataGrid = dynamic(() => import('@/components/ui/DataGrid'));

interface ActivityInfoProps {
  item: NotificationModel;
  userId?: string;
}

const ActivityInfo = ({ item, userId = '' }: ActivityInfoProps) => {
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
    <div className="flex gap-2 justify-items-start">
      <Avatar
        src={`${API_IMAGE_URL}${senderAvatar}`}
        size="md"
        hasBorder
        color="warning"
        className="shrink-0"
      />
      <div className="flex flex-col mr-6">
        <Text size="xs" variant="description" customClass="text-wrap">
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
          className="leading-[27px]"
        />
      );
    },
  },
];

interface ActivityFeedProps extends MetaResponse {
  notifications: NotificationResponse[];
  userId: string;
}

const ActivityFeedList = memo(
  ({ userId, notifications, pagination }: ActivityFeedProps) => (
    <Card className="bg-background-200 p-4 md:pl-7 w-full lg:w-[495px]">
      <Text variant="title" size="lg" customClass="leading-9">
        Activity Feed
      </Text>
      <div className="flex flex-col items-center">
        <DataGrid
          data={notifications}
          pagination={pagination}
          columns={
            COLUMNS_ACTIVITY_FEED.map((column) => ({
              ...column,
              customNode: (_, item: NotificationModel) =>
                column.key === 'sender' ? (
                  <ActivityInfo item={item} userId={userId} />
                ) : column.customNode ? (
                  column.customNode(column, item)
                ) : null,
            })) as ColumnType<unknown>[]
          }
          classWrapper="pt-4"
          classCell="pb-6"
        />
      </div>
    </Card>
  ),
);

ActivityFeedList.displayName = 'ActivityFeedList';
export default ActivityFeedList;
