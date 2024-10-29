import { memo } from 'react';

// Types
import { NotificationResponse } from '@/types';

// Constants

// Components
import { Badge, Divider } from '@nextui-org/react';
import { Button, Popover, Text } from '@/components/ui';
import { BellIcon } from '@/icons';
import NotificationList from './NotificationList';

interface NotificationsProps {
  isInvisibleBadge?: boolean;
  id?: string;
  searchParams: string;
  totalNotifications?: number;
  notifications?: NotificationResponse[];
}

const Notifications = memo(
  ({
    isInvisibleBadge,
    id,
    totalNotifications = 0,
    searchParams,
    notifications = [],
  }: NotificationsProps) => {
    return (
      <>
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
                  badge: 'w-4 h-4 text-[8px] top-[15%] right-[15%]',
                }}
                content={totalNotifications}
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
              <NotificationList
                initialNotifications={notifications}
                searchParams={searchParams.toString()}
                id={id}
              />
            </>
          }
        />
      </>
    );
  },
);

Notifications.displayName = 'Notifications';
export default Notifications;
