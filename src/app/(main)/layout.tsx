// Components
import { Footer } from '@/components/layouts';
import HeaderDashboard from '@/components/layouts/HeaderDashboard';
import { Sidebar } from '@/components/layouts/Sidebar';

// Components
import { MOCK_NOTIFICATION_LIST } from '@/mocks';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="flex relative md:pl-[81px] lg:pl-[277px]">
        <Sidebar />

        <div className="flex flex-col min-h-[100vh] max-h-fit w-full relative bg-background-200">
          {/* TODO: Replace header props with user information when login */}
          <HeaderDashboard
            avatarUrl={''}
            notificationList={MOCK_NOTIFICATION_LIST}
            isInvisibleBadge
          />

          {children}

          <Footer />
        </div>
      </div>
    </main>
  );
}
