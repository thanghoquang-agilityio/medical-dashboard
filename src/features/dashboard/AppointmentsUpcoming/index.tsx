import dynamic from 'next/dynamic';
const AppointmentsUpcomingList = dynamic(
  () => import('./AppointmentsUpcomingList'),
);

// Constants
import {
  API_ENDPOINT,
  APPOINTMENT_STATUS_OPTIONS,
  PAGE_LIMIT_APPOINTMENTS_UPCOMING,
  PRIVATE_ROUTES,
  ROLE,
} from '@/constants';

// Services
import { getAppointments } from '@/services';

export interface AppointmentsUpcomingProps {
  userId: string;
  role: string;
  status: string;
}

const AppointmentsUpcoming = async ({
  userId,
  role,
  status,
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
  const valueStatus = APPOINTMENT_STATUS_OPTIONS.find(
    (option) => option.key === status,
  )?.value;

  if (status) {
    searchParamsAPI.set('filters[status][$eq]', `${valueStatus}`);
  }

  const { appointments, error } = await getAppointments({
    searchParams: searchParamsAPI,
    options: {
      next: {
        tags: [
          API_ENDPOINT.NOTIFICATIONS,
          `${PRIVATE_ROUTES.DASHBOARD}/${userId}/${status}`,
        ],
      },
    },
  });

  if (error) throw error;

  return (
    <AppointmentsUpcomingList
      appointments={appointments || []}
      defaultStatus={status}
    />
  );
};

export default AppointmentsUpcoming;
