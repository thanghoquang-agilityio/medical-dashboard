import dynamic from 'next/dynamic';

// Config
import { auth } from '@/config/auth';

// Services
import { getNotifications } from '@/services';

// Constants
import {
  API_ENDPOINT,
  HOST_DOMAIN,
  PRIVATE_ROUTES,
  ROUTE_ENDPOINT,
} from '@/constants';

// Components
import { Sidebar } from '@/components/layouts';

// Types
import { DIRECTION, ROLE, UserLogged } from '@/types';

const HeaderDashboard = dynamic(
  () => import('@/components/layouts/HeaderDashboard'),
);
const Footer = dynamic(() => import('@/components/layouts/Footer'));

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id, token = '', role = '' } = (await auth())?.user || {};

  const response = await fetch(
    `${HOST_DOMAIN}/${ROUTE_ENDPOINT.USER.GET_LOGGED}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const {
    user: userLogged,
  }: {
    user: UserLogged | null;
    error: string | null;
  } = await response.json();

  const { avatar = '' } = userLogged || {};
  const searchParamsAPI = new URLSearchParams();

  searchParamsAPI.set('populate[0]', 'senderId');

  if (role !== ROLE.ADMIN)
    searchParamsAPI.set('filters[senderId][id][$eq]', `${id}`);

  searchParamsAPI.set('sort[0]', `createdAt:${DIRECTION.DESC}`);

  const { notifications, pagination } = await getNotifications({
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
      <section className="flex flex-col min-h-[100vh] max-h-fit w-full relative bg-background-100 md:pl-[81px] lg:pl-[277px] max-w-[2560px] m-auto">
        <HeaderDashboard
          id={id}
          avatar={avatar}
          isInvisibleBadge={!notifications.length}
          notifications={notifications}
          totalNotifications={pagination?.total || 0}
          searchParams={searchParamsAPI.toString()}
        />
        <section className="relative min-h-fit h-full px-[17px] md:px-8">
          {children}
        </section>
        <Footer />
      </section>
    </main>
  );
}
