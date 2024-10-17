import dynamic from 'next/dynamic';

// Config
import { auth } from '@/config/auth';

// Services
import { getNotifications } from '@/services';

// Constants
import { API_ENDPOINT, PRIVATE_ROUTES } from '@/constants';

// Components
import { Sidebar } from '@/components/layouts';

const HeaderDashboard = dynamic(
  () => import('@/components/layouts/HeaderDashboard'),
);
const Footer = dynamic(() => import('@/components/layouts/Footer'));

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { avatar, id } = (await auth())?.user || {};
  const searchParamsAPI = new URLSearchParams();

  searchParamsAPI.set('populate[0]', 'senderId');
  searchParamsAPI.set('filters[senderId][id][$eq]', `${id}`);

  const { notifications } = await getNotifications({
    searchParams: searchParamsAPI,
    options: {
      next: {
        tags: [API_ENDPOINT.NOTIFICATIONS, `${PRIVATE_ROUTES.DASHBOARD}/${id}`],
      },
    },
  });

  return (
    <main>
      <Sidebar />
      <div className="flex flex-col min-h-[100vh] max-h-fit w-full relative bg-background-100 md:pl-[81px] lg:pl-[277px] max-w-[2560px] m-auto">
        <HeaderDashboard
          avatarUrl={avatar ?? ''}
          notifications={notifications}
          isInvisibleBadge={!notifications.length}
        />
        <div className="relative min-h-fit h-full px-[17px] md:px-8">
          {children}
        </div>
        <Footer />
      </div>
    </main>
  );
}
