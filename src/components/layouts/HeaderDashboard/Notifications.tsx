import { memo } from 'react';

// Utils
import { formatDateTime, fromDateToNow } from '@/utils';

// Types
import { NotificationResponse } from '@/types';

// Constants
import { API_IMAGE_URL, TYPE_CLASSES } from '@/constants';

// Components
import { Badge, Divider } from '@nextui-org/react';
import { Avatar, Button, Popover, Text } from '@/components/ui';
import { BellIcon, SingleDotIcon } from '@/icons';

interface NotificationsProps {
  notifications: NotificationResponse[];
  isInvisibleBadge?: boolean;
}

const Notifications = memo(
  ({ notifications, isInvisibleBadge }: NotificationsProps) => {
    return (
      <Popover
        classNames={{
          base: 'w-[350px] sm:w-[460px]',
          content: 'w-[350px] sm:w-[455px] relative bg-background-200 px-0',
        }}
        placement="bottom-end"
        popoverTrigger={
          <Button
            isIconOnly
            className="p-0 min-w-6 h-6 text-primary-300 overflow-visible"
          >
            <Badge
              className="bg-danger-100 text-content1"
              classNames={{
                badge:
                  'min-w-3 min-h-3 w-3 h-3 text-[6px] top-[15%] right-[15%]',
              }}
              content={notifications.length}
              size="sm"
              showOutline={false}
              isInvisible={isInvisibleBadge}
            >
              <BellIcon customClass="w-6 h-6 text-primary-300" />
            </Badge>
          </Button>
        }
        popoverContent={
          <>
            <Text variant="title" size="lg">
              Notifications
            </Text>
            <Divider />
            <div className="h-80 flex flex-col pl-4 overflow-y-scroll">
              {notifications.length ? (
                notifications.map(({ attributes, id }) => (
                  <div
                    key={id}
                    className="w-full relative flex justify-start my-2"
                  >
                    <Avatar
                      src={`${API_IMAGE_URL}${attributes.senderAvatar}`}
                      size="md"
                      isCustomBordered
                    />
                    <div className="w-[315px] sm:w-[420px] flex flex-col pl-2 pr-10">
                      <Text
                        size="xs"
                        variant="description"
                        customClass={TYPE_CLASSES.wrap}
                      >
                        You {attributes.info.content} at&nbsp;
                        {formatDateTime(attributes.info.startTime)}
                      </Text>
                      <Text variant="subTitle" size="2xs">
                        {fromDateToNow(attributes.createdAt ?? '')}
                      </Text>
                    </div>
                    {!attributes.isRead && (
                      <SingleDotIcon customClass="absolute right-0 w-10 h-full text-primary" />
                    )}
                  </div>
                ))
              ) : (
                <Text variant="title" customClass="my-auto pr-4">
                  No notification
                </Text>
              )}
            </div>
          </>
        }
      />
    );
  },
);

Notifications.displayName = 'Notifications';
export default Notifications;
