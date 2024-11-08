'use client';
import dynamic from 'next/dynamic';

// Types
import { NotificationResponse } from '@/types';

// Components
import { Avatar } from '@/components/ui';
import { SidebarMobile } from '../Sidebar/SideBarMobile';

// Hooks
import { useFcmToken } from '@/hooks';
const SwitchTheme = dynamic(() => import('@/components/ui/SwitchTheme'));
const Notifications = dynamic(() => import('./Notifications'));

interface HeaderProps {
  avatar: string;
  notifications?: NotificationResponse[];
  userName?: string;
  isInvisibleBadge?: boolean;
  totalNotifications?: number;
  id?: string;
  searchParams: string;
}

const HeaderDashboard = ({
  avatar,
  userName = '',
  isInvisibleBadge = false,
  totalNotifications = 0,
  id = '',
  searchParams,
  notifications,
}: HeaderProps) => {
  const _ = useFcmToken();

  return (
    <header className="flex sticky z-[20] top-0 justify-end items-center gap-6 w-full h-14 bg-background-100 px-[17px] md:px-8">
      <SidebarMobile />
      <SwitchTheme />

      <Notifications
        searchParams={searchParams}
        notifications={notifications}
        totalNotifications={totalNotifications}
        id={id}
        isInvisibleBadge={isInvisibleBadge}
      />
      <Avatar
        id={id}
        src={avatar}
        name={userName}
        size="md"
        color="warning"
        className="aspect-square border-4 border-soft-grey dark:border-rock rounded-full"
      />
    </header>
  );
};

HeaderDashboard.displayName = 'HeaderDashboard';
export default HeaderDashboard;
