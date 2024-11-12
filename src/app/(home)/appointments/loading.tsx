import { AppointmentCreateSkeleton } from '@/features/appointments/AppointmentCreate/AppointmentCreateSkeleton';
import { AppointmentsHistorySkeleton } from '@/features/appointments/AppointmentsHistory/AppointmentsHistorySkeleton';

const Loading = () => {
  return (
    <>
      <AppointmentCreateSkeleton />
      <AppointmentsHistorySkeleton />
    </>
  );
};

export default Loading;
