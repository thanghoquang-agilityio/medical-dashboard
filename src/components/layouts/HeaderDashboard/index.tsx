'use client';
import dynamic from 'next/dynamic';

// Types
import { NotificationResponse } from '@/types';

// Constants
import { API_IMAGE_URL } from '@/constants';

// Components
import { Avatar } from '@/components/ui';
import { SidebarMobile } from '../Sidebar/SideBarMobile';

// Hooks
import { useFcmToken } from '@/hooks';
const SwitchTheme = dynamic(() => import('@/components/ui/SwitchTheme'));
const Notifications = dynamic(() => import('./Notifications'));

interface HeaderProps {
  avatarUrl: string;
  notifications?: NotificationResponse[];
  userName?: string;
  isInvisibleBadge?: boolean;
}

const HeaderDashboard = ({
  avatarUrl,
  userName,
  notifications,
  isInvisibleBadge = false,
}: HeaderProps) => {
  const _ = useFcmToken();
  return (
    <header className="flex sticky z-[20] top-0 justify-end items-center gap-6 w-full h-14 bg-background-100 px-[17px] md:px-8">
      <SidebarMobile />
      <SwitchTheme />

      <Notifications
        notifications={notifications || []}
        isInvisibleBadge={isInvisibleBadge}
      />
      <Avatar
        src={`${API_IMAGE_URL}${avatarUrl}`}
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
