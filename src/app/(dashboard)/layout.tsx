import dynamic from 'next/dynamic';

// Mocks
import { MOCK_NOTIFICATION_LIST } from '@/mocks';

// Components
import { Footer, Sidebar } from '@/components/layouts';
const HeaderDashboard = dynamic(
  () => import('@/components/layouts/HeaderDashboard'),
);

// Style
import './dashboard.css';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <Sidebar />

      <div className="flex flex-col min-h-[100vh] max-h-fit w-full relative bg-background-100 md:pl-[81px] lg:pl-[277px]">
        {/* TODO: Replace header props with user information when login */}
        <HeaderDashboard
          avatarUrl={''}
          notificationList={MOCK_NOTIFICATION_LIST}
          isInvisibleBadge
        />
        <div />
        <div className="container">{children}</div>
        <Footer />
      </div>
    </main>
  );
}
