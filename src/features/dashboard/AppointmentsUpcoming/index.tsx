import dynamic from 'next/dynamic';
const AppointmentsUpcomingList = dynamic(
  () => import('./AppointmentsUpcomingList'),
);

// Constants
import {
  API_ENDPOINT,
  PAGE_LIMIT_APPOINTMENTS_UPCOMING,
  PRIVATE_ROUTES,
  ROLE,
} from '@/constants';

// Services
import { getAppointments } from '@/services';

interface AppointmentsUpcomingProps {
  userId: string;
  role: string;
}

const AppointmentsUpcoming = async ({
  userId,
  role,
}: AppointmentsUpcomingProps) => {
  const searchParamsAPI = new URLSearchParams();
  searchParamsAPI.set('populate[0]', 'receiverId');
  searchParamsAPI.set('populate[1]', 'senderId');
  searchParamsAPI.set(
    'pagination[limit]',
    `${PAGE_LIMIT_APPOINTMENTS_UPCOMING}`,
  );

  if (role === ROLE.USER || !role) {
    searchParamsAPI.set('filters[senderId][id][$eq]', `${userId}`);
  }

  const { appointments } = await getAppointments({
    searchParams: searchParamsAPI,
    options: {
      next: {
        tags: [
          API_ENDPOINT.NOTIFICATIONS,
          `${PRIVATE_ROUTES.DASHBOARD}/${userId}`,
        ],
      },
    },
  });

  return <AppointmentsUpcomingList appointments={appointments || []} />;
};

export default AppointmentsUpcoming;
