import { memo } from 'react';

// Utils
import { fromDateToNow } from '@/utils';

// Types
import { NotificationResponse } from '@/types';

// Constants
import { API_IMAGE_URL } from '@/constants';

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
        className="relative bg-background-200 pr-0"
        popoverTrigger={
          <Button
            isIconOnly
            className="p-0 min-w-6 h-6 text-primary-300 overflow-visible"
          >
            <Badge
              className="bg-danger-200 text-content1"
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
            {notifications.length ? (
              notifications.map(({ attributes, id }) => (
                <div
                  key={id}
                  className="relative flex justify-center justify-items-start my-2"
                >
                  <Avatar
                    src={`${API_IMAGE_URL}${attributes.senderAvatar}`}
                    size="md"
                    hasBorder
                  />
                  <div className={`flex flex-col pl-2 pr-10`}>
                    <Text size="xs" variant="description">
                      You {attributes.info.content} {attributes.isRead}
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
              <Text variant="title">No notification</Text>
            )}
          </>
        }
        placement="bottom-end"
      />
    );
  },
);

Notifications.displayName = 'Notifications';
export default Notifications;
