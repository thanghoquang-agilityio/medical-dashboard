import { Suspense } from 'react';
import { Metadata } from 'next';

// Components
import AppointmentHistory from '@/features/appointments/AppointmentHistory';

// Constants
import { PAGE_DEFAULT } from '@/constants';
import { ROLE, SearchParams } from '@/types';
import { auth } from '@/config/auth';
import { Spinner } from '@/components/ui';

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

  return (
    <Suspense fallback={<Spinner />}>
      <AppointmentHistory
        page={page}
        role={role}
        userId={id}
        search={search}
        status={status}
      />
    </Suspense>
  );
};

export default AppointmentPage;
