import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Metadata } from 'next';

// Constants
import {
  API_ENDPOINT,
  APPOINTMENT_STATUS_OPTIONS,
  PAGE_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PRIVATE_ROUTES,
} from '@/constants';

// Types
import { DIRECTION, ROLE, SearchParams } from '@/types';

// Config
import { auth } from '@/config/auth';

// Services
import { getAppointments } from '@/services';

// Components
import { AppointmentsHistorySkeleton } from '@/features/appointments/AppointmentsHistory/AppointmentsHistorySkeleton';
const AppointmentsHistory = dynamic(
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
    search,
    status = '',
  } = searchParams as AppointmentPageSearchParamsProps;

  const { id = '', role = ROLE.NORMAL_USER } = (await auth())?.user || {};
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
          `filters[$or][${index}][$and][${index}][${param}][username][$containsi]`,
          search,
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
  }

  if (role === ROLE.NORMAL_USER || !role) {
    APPOINTMENT_SEARCH_PARAMS.forEach((param, index) =>
      searchParamsAPI.set(`filters[$or][${index}][${param}][id][$eq]`, id),
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
        tags: [API_ENDPOINT.APPOINTMENTS, `${PRIVATE_ROUTES.DASHBOARD}/${id}`],
      },
    },
  });

  return (
    <Suspense fallback={<AppointmentsHistorySkeleton />}>
      <AppointmentsHistory
        appointments={appointments || []}
        pagination={meta?.pagination}
        userId={id}
        role={role}
        defaultStatus={status}
      />
    </Suspense>
  );
};

export default AppointmentPage;
