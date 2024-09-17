'use client';

import { Badge, Divider } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';

// Components
import { Avatar, Button, Text, Popover } from '@/components/ui';

// Icons
import { BellIcon, DarkIcon, LightIcon, SingleDotIcon } from '@/icons';

// Types
import { NotificationResponse } from '@/types';

interface HeaderProps {
  avatarUrl: string;
  notificationList?: NotificationResponse[];
  userName?: string;
  isInvisibleBadge?: boolean;
  avatarColor?: number;
}

export const HeaderDashboard = ({
  avatarUrl,
  userName,
  notificationList,
  isInvisibleBadge = false,
}: HeaderProps) => {
  const { theme, setTheme } = useTheme();

  // Handle switch theme when toggle on the button
  const handleSwitchTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

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
                <SingleDotIcon customClass="absolute right-0 w-10 h-10 text-primary" />
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
    <header className="flex justify-end items-center gap-0.5 w-full h-14 bg-background-200">
      <Button size="xs" isIconOnly onClick={handleSwitchTheme}>
        {theme === 'light' ? (
          <LightIcon customClass="w-6 h-6 text-black" />
        ) : (
          <DarkIcon customClass="w-6 h-6 " />
        )}
      </Button>
      <Popover
        className="relative bg-background-200"
        popoverTrigger={
          <Button size="xs" isIconOnly>
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
      />
      <Avatar
        src={avatarUrl}
        name={userName}
        hasBorder
        size="md"
        color="warning"
        className="mr-12"
      />
    </header>
  );
};

HeaderDashboard.displayName = 'HeaderDashboard';
