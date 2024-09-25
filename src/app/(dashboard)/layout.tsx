import dynamic from 'next/dynamic';

// Mocks
import { MOCK_NOTIFICATION_LIST } from '@/mocks';

// Components
import { Sidebar } from '@/components/layouts';
const HeaderDashboard = dynamic(
  () => import('@/components/layouts/HeaderDashboard'),
);
const Footer = dynamic(() => import('@/components/layouts/Footer'));

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex max-w-[1158px] m-auto">
      <Sidebar />

      <div className="flex flex-col min-h-[100vh] max-h-fit w-full relative bg-background-100 md:pl-[81px] lg:pl-[277px]">
        {/* TODO: Replace header props with user information when login */}
        <HeaderDashboard
          avatarUrl={''}
          notificationList={MOCK_NOTIFICATION_LIST}
          isInvisibleBadge
        />
        <div />
        <div className="min-h-fit h-full px-[17px] md:px-8">{children}</div>
        <Footer />
      </div>
    </main>
  );
}
