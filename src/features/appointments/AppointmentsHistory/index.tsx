// Components
import AppointmentsHistory from '@/features/appointments/AppointmentsHistory/AppointmentsHistory';

// Services
import { getAppointments } from '@/services';

// Types
import { MetaResponse, UserLogged } from '@/types';

interface AppointmentsProps extends MetaResponse {
  userLogged: UserLogged | null;
  defaultStatus?: string;
  searchParamsAPI: URLSearchParams;
}

const Appointments = async ({
  userLogged,
  defaultStatus,
  searchParamsAPI,
}: AppointmentsProps) => {
  const { appointments, error, ...meta } = await getAppointments({
    searchParams: searchParamsAPI,
  });

  if (error) throw new Error(error);

  return (
    <AppointmentsHistory
      appointments={appointments || []}
      pagination={meta?.pagination}
      userLogged={userLogged}
      defaultStatus={defaultStatus}
    />
  );
};

export default Appointments;
