// Components
import AppointmentList from './AppointmentList';

// Services
import { getAppointments } from '@/services';

// Types
import { DIRECTION } from '@/types';

// Constants
import {
  API_ENDPOINT,
  PAGE_SIZE_DEFAULT,
  PRIVATE_ROUTES,
  ROLE,
} from '@/constants';

interface AppointmentHistoryProps {
  page: number;
  userId: string;
  role: string;
}

// Create appointments params
const APPOINTMENT_SEARCH_PARAMS = ['receiverId', 'senderId'];

const AppointmentHistory = async ({
  page,
  role,
  userId,
}: AppointmentHistoryProps) => {
  const searchParamsAPI = new URLSearchParams();

  // Set params
  APPOINTMENT_SEARCH_PARAMS.forEach((param, index) =>
    searchParamsAPI.set(`populate[${index}]`, param),
  );
  searchParamsAPI.set('pagination[page]', `${page}`);
  searchParamsAPI.set('pagination[pageSize]', `${PAGE_SIZE_DEFAULT}`);
  searchParamsAPI.set('sort[0]', `createdAt:${DIRECTION.DESC}`);

  if (role === ROLE.USER || !role) {
    APPOINTMENT_SEARCH_PARAMS.forEach((param, index) =>
      searchParamsAPI.set(
        `filters[$or][${index}][${param}][id][$eq]`,
        `${userId}`,
      ),
    );
  }

  const { appointments, ...meta } = await getAppointments({
    searchParams: searchParamsAPI,
    options: {
      next: {
        tags: [
          API_ENDPOINT.APPOINTMENTS,
          `${PRIVATE_ROUTES.DASHBOARD}/${userId}`,
        ],
      },
    },
  });

  return (
    <AppointmentList
      appointments={appointments || []}
      pagination={meta?.pagination}
      role={role}
    />
  );
};

export default AppointmentHistory;
