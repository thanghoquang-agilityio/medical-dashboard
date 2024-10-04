'use client';
import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';

// Constants
import {
  API_ENDPOINT,
  APPOINTMENT_STATUS_OPTIONS,
  PAGE_LIMIT_APPOINTMENTS_UPCOMING,
  PRIVATE_ROUTES,
} from '@/constants';

// Services
import { getAppointments } from '@/services';

// Components
import { AppointmentsUpcomingSkeleton } from './AppointmentsUpcomingSkeleton';
import { AppointmentResponse } from '@/types';
const AppointmentsUpcomingList = lazy(
  () => import('./AppointmentsUpcomingList'),
);

export interface AppointmentsUpcomingProps {
  userId: string;
  role: string;
  status?: string;
}

const AppointmentsUpcoming = ({
  userId,
  role,
  status = APPOINTMENT_STATUS_OPTIONS[0].key,
}: AppointmentsUpcomingProps) => {
  const [lastFetchedStatus, setLastFetchedStatus] = useState(status);
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);

  const searchParamsAPI = useMemo(() => {
    const params = new URLSearchParams();
    params.set('populate[0]', 'receiverId');
    params.set('populate[1]', 'senderId');
    params.set('pagination[limit]', `${PAGE_LIMIT_APPOINTMENTS_UPCOMING}`);
    params.set('filters[senderId][id][$eq]', `${userId}`);

    const valueStatus = APPOINTMENT_STATUS_OPTIONS.find(
      (option) => option.key === status,
    )?.value;
    params.set('filters[status][$eq]', `${valueStatus}`);

    return params;
  }, [userId, status]);

  const isFirstRender = useRef(true); // Move useRef outside of useEffect

  useEffect(() => {
    setIsLoading(true);
    const fetchAppointments = async () => {
      const { appointments, error } = await getAppointments({
        searchParams: searchParamsAPI,
        options: {
          next: {
            tags: [
              API_ENDPOINT.APPOINTMENTS,
              `${PRIVATE_ROUTES.DASHBOARD}/${userId}/${status}`,
            ],
          },
        },
      });

      if (error) throw error;
      setAppointments(appointments);
      setIsLoading(false);
    };

    if (isFirstRender.current || status !== lastFetchedStatus) {
      setLastFetchedStatus(status);
      fetchAppointments();
      isFirstRender.current = false; // Update after the first call
    }
  }, [lastFetchedStatus, searchParamsAPI, status, userId]);

  return (
    <>
      {isLoading ? (
        <AppointmentsUpcomingSkeleton />
      ) : (
        <Suspense fallback={<AppointmentsUpcomingSkeleton />}>
          <AppointmentsUpcomingList
            appointments={appointments || []}
            defaultStatus={status}
            role={role}
          />
        </Suspense>
      )}
    </>
  );
};

export default AppointmentsUpcoming;
