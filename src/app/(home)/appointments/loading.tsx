import { AppointmentsHistorySkeleton } from '@/features/appointments/AppointmentsHistory/AppointmentsHistorySkeleton';
import { InputSearch } from '@/components/ui';

const Loading = () => {
  return (
    <>
      <InputSearch
        placeholder="Search Appointments"
        classNames={{ mainWrapper: 'pb-10' }}
        isDisabled={true}
      />
      <AppointmentsHistorySkeleton />
    </>
  );
};

export default Loading;
