// Constants
import { API_ENDPOINT, PRIVATE_ROUTES, ROLE } from '@/constants';

// Components
import AppointmentsUpcomingList from './AppointmentsUpcomingList';

// Services
import { getAppointments } from '@/services';

interface AppointmentsUpcomingProps {
  id: string;
  role: string;
}

const AppointmentsUpcoming = async ({
  id,
  role,
}: AppointmentsUpcomingProps) => {
  const searchParamsAPI = new URLSearchParams();
  searchParamsAPI.set('populate[0]', 'receiverId');
  searchParamsAPI.set('populate[1]', 'senderId');

  if (role === ROLE.USER || !role) {
    searchParamsAPI.set('filters[senderId][id][$eq]', `${id}`);
  }

  const { appointments } = await getAppointments({
    searchParams: searchParamsAPI,
    options: {
      next: {
        tags: [API_ENDPOINT.NOTIFICATIONS, `${PRIVATE_ROUTES.DASHBOARD}/${id}`],
      },
    },
  });

  return <AppointmentsUpcomingList appointments={appointments || []} />;
};

export default AppointmentsUpcoming;
