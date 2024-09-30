// Components
import AppointmentList from './AppointmentList';
import { InputSearch } from '@/components/ui';

// Services
import { getAppointments } from '@/services';

// Types
import { DIRECTION } from '@/types';

// Constants
import {
  API_ENDPOINT,
  APPOINTMENT_STATUS_OPTIONS,
  PAGE_SIZE_DEFAULT,
  PRIVATE_ROUTES,
  ROLE,
} from '@/constants';

interface AppointmentHistoryProps {
  page: number;
  userId: string;
  role: string;
  search?: string;
  status: string;
}

// Create appointments params
const APPOINTMENT_SEARCH_PARAMS = ['receiverId', 'senderId'];

const AppointmentHistory = async ({
  page,
  role,
  userId,
  search,
  status,
}: AppointmentHistoryProps) => {
  const searchParamsAPI = new URLSearchParams();

  // Set params
  APPOINTMENT_SEARCH_PARAMS.forEach((param, index) => {
    searchParamsAPI.set(`populate[${index}]`, param),
      searchParamsAPI.set(`populate[${param}][populate][avatar]`, '*');
  });
  searchParamsAPI.set('pagination[page]', page.toString());
  searchParamsAPI.set('pagination[pageSize]', PAGE_SIZE_DEFAULT.toString());
  searchParamsAPI.set('sort[0]', `createdAt:${DIRECTION.DESC}`);

  // Search params by role
  if (search) {
    if (role === ROLE.USER || !role) {
      APPOINTMENT_SEARCH_PARAMS.forEach((param, index) =>
        searchParamsAPI.set(
          `filters[$or][${index}][$and][${index}][${param}][username][$contains]`,
          search,
        ),
      );
    } else {
      APPOINTMENT_SEARCH_PARAMS.forEach((param, index) =>
        searchParamsAPI.set(
          `filters[$or][${index}][${param}][username][$contains]`,
          search,
        ),
      );
    }
  }

  if (role === ROLE.USER || !role) {
    APPOINTMENT_SEARCH_PARAMS.forEach((param, index) =>
      searchParamsAPI.set(`filters[$or][${index}][${param}][id][$eq]`, userId),
    );
    searchParamsAPI.set('populate[senderId][populate][avatar]', '*');
  }

  const valueStatus = APPOINTMENT_STATUS_OPTIONS.find(
    (option) => option.key === status,
  )?.value;

  if (status) {
    searchParamsAPI.set('filters[status][$eq]', `${valueStatus}`);
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
    <>
      <InputSearch
        placeholder="Search Appointments"
        className="max-w-[400px] py-5"
      />
      <AppointmentList
        appointments={appointments || []}
        pagination={meta?.pagination}
        role={role}
        defaultStatus={status}
      />
    </>
  );
};

export default AppointmentHistory;
