// Constants
import {
  API_ENDPOINT,
  APPOINTMENT_STATUS_OPTIONS,
  PAGE_LIMIT_APPOINTMENTS_UPCOMING,
} from '@/constants';

// Actions
import { getAppointments } from '@/actions/appointment';

// Types
import { DIRECTION, UserLogged } from '@/types';

// Components
import AppointmentsUpcomingList from './AppointmentsUpcomingList';

export interface AppointmentsUpcomingProps {
  userLogged: UserLogged | null;
  status?: string;
}

const AppointmentsUpcoming = async ({
  userLogged,
  status = APPOINTMENT_STATUS_OPTIONS[0].key,
}: AppointmentsUpcomingProps) => {
  const { id: userId = '' } = userLogged || {};

  const searchParamsAPI = () => {
    const params = new URLSearchParams();
    params.set('populate[0]', 'receiverId');
    params.set('populate[1]', 'senderId');
    params.set('pagination[limit]', `${PAGE_LIMIT_APPOINTMENTS_UPCOMING}`);
    params.set('filters[$or][0][senderId][id][$eq]', `${userId}`);
    params.set('filters[$or][1][receiverId][id][$eq]', `${userId}`);
    params.set('sort[0]', `createdAt:${DIRECTION.DESC}`);

    const valueStatus = APPOINTMENT_STATUS_OPTIONS.find(
      (option) => option.key === status,
    )?.value;
    params.set('filters[status][$eq]', `${valueStatus}`);
    return params;
  };

  const { appointments, error } = await getAppointments({
    searchParams: searchParamsAPI(),
    options: {
      next: {
        tags: [`${API_ENDPOINT.APPOINTMENTS}/dashboard`],
      },
    },
  });

  if (error) throw error;

  return (
    <AppointmentsUpcomingList
      appointments={appointments || []}
      defaultStatus={status}
      userLogged={userLogged}
    />
  );
};

export default AppointmentsUpcoming;
