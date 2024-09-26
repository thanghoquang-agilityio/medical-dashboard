// Mocks

import AppointmentsUpcomingClient from './Client';

// Services
import { getAppointments } from '@/services';

const AppointmentsUpcoming = async () => {
  const searchParamsAPI = new URLSearchParams();
  searchParamsAPI.set('populate[0]', 'receiverId');
  searchParamsAPI.set('populate[1]', 'senderId');

  const { appointments } = await getAppointments({
    searchParams: searchParamsAPI,
  });

  return <AppointmentsUpcomingClient appointments={appointments || []} />;
};

export default AppointmentsUpcoming;
