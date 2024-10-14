import { Suspense, lazy } from 'react';
import { Metadata } from 'next';

// Constants
import {
  APPOINTMENT_STATUS_OPTIONS,
  PAGE_DEFAULT,
  PAGE_SIZE_DEFAULT,
} from '@/constants';

// Types
import { DIRECTION, ROLE, SearchParams } from '@/types';

// Config
import { auth } from '@/config/auth';

// Services
import { getAppointments, getUserLogged } from '@/services';

// Components
import { AppointmentsHistorySkeleton } from '@/features/appointments/AppointmentsHistory/AppointmentsHistorySkeleton';
const AppointmentsHistory = lazy(
  () => import('@/features/appointments/AppointmentsHistory'),
);

export const metadata: Metadata = {
  title: 'Appointments',
  description: 'Appointments page for Medical Dashboard',
};

interface AppointmentPageSearchParamsProps extends SearchParams {
  status?: string;
}

const AppointmentPage = async ({
  searchParams,
}: {
  searchParams?: AppointmentPageSearchParamsProps;
}) => {
  const {
    page = PAGE_DEFAULT,
    search = '',
    status = '',
  } = searchParams as AppointmentPageSearchParamsProps;

  const { token = '' } = (await auth())?.user || {};

  const { user: userLogged } = await getUserLogged(token);
  const { id = '', role: roleModel } = userLogged || {};
  const { name: role = ROLE.NORMAL_USER } = roleModel || {};

  const searchParamsAPI = new URLSearchParams();
  const APPOINTMENT_SEARCH_PARAMS = ['receiverId', 'senderId'];

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
    if (role === ROLE.NORMAL_USER || !role) {
      APPOINTMENT_SEARCH_PARAMS.forEach((param, index) =>
        searchParamsAPI.set(
          `filters[$or][${index}][$and][0][${param}][username][$containsi]`,
          search,
        ),
      );
      APPOINTMENT_SEARCH_PARAMS.reverse().forEach((param, index) =>
        searchParamsAPI.set(
          `filters[$or][${index}][$and][1][${param}][id][$eq]`,
          id,
        ),
      );
    } else {
      APPOINTMENT_SEARCH_PARAMS.forEach((param, index) =>
        searchParamsAPI.set(
          `filters[$or][${index}][${param}][username][$containsi]`,
          search,
        ),
      );
    }
  } else {
    if (role === ROLE.NORMAL_USER || !role) {
      APPOINTMENT_SEARCH_PARAMS.forEach((param, index) =>
        searchParamsAPI.set(`filters[$or][${index}][${param}][id][$eq]`, id),
      );
      searchParamsAPI.set('populate[senderId][populate][avatar]', '*');
    }
  }

  const valueStatus = APPOINTMENT_STATUS_OPTIONS.find(
    (option) => option.key === status,
  )?.value;

  if (status) {
    searchParamsAPI.set('filters[status][$eq]', `${valueStatus}`);
  }

  const { appointments, ...meta } = await getAppointments({
    searchParams: searchParamsAPI,
  });

  return (
    <Suspense fallback={<AppointmentsHistorySkeleton />}>
      <AppointmentsHistory
        appointments={appointments || []}
        pagination={meta?.pagination}
        userLogged={userLogged}
        defaultStatus={status}
      />
    </Suspense>
  );
};

export default AppointmentPage;
