'use client';
import dynamic from 'next/dynamic';
import { Badge, Divider } from '@nextui-org/react';

// Types
import { NotificationResponse } from '@/types';

// Components
import { Avatar, Button, Text, Popover } from '@/components/ui';
import { SidebarMobile } from '../Sidebar/SideBarMobile';

// Icons
import { BellIcon, SingleDotIcon } from '@/icons';
const SwitchTheme = dynamic(() => import('@/components/ui/SwitchTheme'));

interface HeaderProps {
  avatarUrl: string;
  notificationList?: NotificationResponse[];
  userName?: string;
  isInvisibleBadge?: boolean;
  avatarColor?: number;
}

const HeaderDashboard = ({
  avatarUrl,
  userName,
  notificationList,
  isInvisibleBadge = false,
}: HeaderProps) => {
  // Render notification content
  const renderNotificationContent = () => {
    return (
      <>
        <Text variant="title" size="xl">
          Notifications
        </Text>
        <Divider />
        {notificationList?.length ? (
          notificationList.map(({ attributes, id }) => (
            <div
              key={id}
              className="relative flex gap-2 justify-center justify-items-start my-2"
            >
              <Avatar src={attributes.senderAvatar} size="lg" hasBorder />
              <div className={`flex flex-col gap-2 pl-2 pr-10`}>
                {/* TODO: Update this notification content */}
                <Text size="md" variant="description">
                  You have been given medication of heart burn
                </Text>
                <Text variant="subTitle">1 hours ago</Text>
              </div>
              {attributes.isRead && (
                <SingleDotIcon customClass="absolute right-0 w-10 h-full text-primary" />
              )}
            </div>
          ))
        ) : (
          <Text variant="title">No notification</Text>
        )}
      </>
    );
  };

  return (
    <header className="flex sticky z-[10] top-0 justify-end items-center gap-0.5 w-full h-14 bg-background-100 pr-4 md:pr-11">
      <SidebarMobile />
      <SwitchTheme />

      <Popover
        className="relative bg-background-200 pr-0"
        popoverTrigger={
          <Button isIconOnly>
            <Badge
              className="bg-danger-200 text-content1"
              content={notificationList?.length ? notificationList.length : 0}
              size="sm"
              showOutline={false}
              isInvisible={isInvisibleBadge}
            >
              <BellIcon customClass="w-6 h-6 text-primary-300" />
            </Badge>
          </Button>
        }
        popoverContent={renderNotificationContent()}
        placement="bottom-end"
      />
      <Avatar
        src={avatarUrl}
        name={userName}
        hasBorder
        size="md"
        color="warning"
      />
    </header>
  );
};

HeaderDashboard.displayName = 'HeaderDashboard';
export default HeaderDashboard;
