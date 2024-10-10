// 'use client';
import { Suspense, lazy, useMemo } from 'react';

// Constants
import {
  API_ENDPOINT,
  APPOINTMENT_STATUS_OPTIONS,
  PAGE_LIMIT_APPOINTMENTS_UPCOMING,
} from '@/constants';

// Actions
import { getAppointments } from '@/actions/appointment';

// Components
import { AppointmentsUpcomingSkeleton } from './AppointmentsUpcomingSkeleton';
import { UserLogged } from '@/types';
const AppointmentsUpcomingList = lazy(
  () => import('./AppointmentsUpcomingList'),
);

export interface AppointmentsUpcomingProps {
  userLogged: UserLogged | null;
  status?: string;
}

const AppointmentsUpcoming = async ({
  userLogged,
  status = APPOINTMENT_STATUS_OPTIONS[0].key,
}: AppointmentsUpcomingProps) => {
  const { id: userId = '' } = userLogged || {};

  const searchParamsAPI = useMemo(() => {
    const params = new URLSearchParams();
    params.set('populate[0]', 'receiverId');
    params.set('populate[1]', 'senderId');
    params.set('pagination[limit]', `${PAGE_LIMIT_APPOINTMENTS_UPCOMING}`);
    params.set('filters[$or][0][senderId][id][$eq]', `${userId}`);
    params.set('filters[$or][1][receiverId][id][$eq]', `${userId}`);
    params.set('sort[0]', 'createdAt:desc');

    const valueStatus = APPOINTMENT_STATUS_OPTIONS.find(
      (option) => option.key === status,
    )?.value;
    params.set('filters[status][$eq]', `${valueStatus}`);
    return params;
  }, [userId, status]);

  const { appointments, error } = await getAppointments({
    searchParams: searchParamsAPI,
    options: {
      next: {
        tags: [`${API_ENDPOINT.APPOINTMENTS}/dashboard`],
      },
    },
  });

  if (error) throw error;

  return (
    <Suspense
      fallback={<AppointmentsUpcomingSkeleton defaultStatus={status} />}
    >
      <AppointmentsUpcomingList
        appointments={appointments || []}
        defaultStatus={status}
        userLogged={userLogged}
      />
    </Suspense>
  );
};

export default AppointmentsUpcoming;
