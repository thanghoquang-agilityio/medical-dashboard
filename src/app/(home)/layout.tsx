import dynamic from 'next/dynamic';

// Config
import { auth } from '@/config/auth';

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
import {
  DIRECTION,
  MetaResponse,
  NotificationResponse,
  ROLE,
  UserLogged,
} from '@/types';
import { headers } from 'next/headers';

const HeaderDashboard = dynamic(
  () => import('@/components/layouts/HeaderDashboard'),
);
const Footer = dynamic(() => import('@/components/layouts/Footer'));

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextHeader = new Headers(headers());
  const { id, token = '', role = '' } = (await auth())?.user || {};

  const responseGetUserLogged = await fetch(
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
  } = await responseGetUserLogged.json();

  const { avatar = '' } = userLogged || {};
  const searchParamsAPI = new URLSearchParams();

  searchParamsAPI.set('populate[0]', 'senderId');

  if (role !== ROLE.ADMIN)
    searchParamsAPI.set('filters[senderId][id][$eq]', `${id}`);

  searchParamsAPI.set('sort[0]', `createdAt:${DIRECTION.DESC}`);

  nextHeader.set(
    'tags',
    [API_ENDPOINT.NOTIFICATIONS, `${PRIVATE_ROUTES.DASHBOARD}/${id}`].join(','),
  );

  const responseGetNotifications = await fetch(
    `${HOST_DOMAIN}/${ROUTE_ENDPOINT.NOTIFICATIONS.GET_NOTIFICATIONS}?${decodeURIComponent(searchParamsAPI.toString())}`,
    {
      method: 'GET',
      // reference: https://github.com/nextauthjs/next-auth/issues/7423
      headers: nextHeader,
    },
  );

  const {
    notifications,
    pagination,
  }: {
    notifications: NotificationResponse[];
    error: string | null;
  } & MetaResponse = await responseGetNotifications.json();

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
