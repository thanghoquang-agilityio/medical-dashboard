import { Suspense, lazy } from 'react';
import { auth } from '@/config/auth';

// Constants
import {
  APPOINTMENT_STATUS_OPTIONS,
  PAGE_DEFAULT,
  SRC_BANNER_AVATAR,
} from '@/constants';

// Types
import { ROLE, SearchParams } from '@/types';

// Utils
import { getGreeting } from '@/utils';
// Components
import { Text, Button, Image } from '@/components/ui';
import { CloseIcon } from '@/icons';
import { ActivityFeedSkeleton } from '@/features/dashboard/ActivityFeed/ActivityFeedSkeleton';
import { AppointmentsUpcomingSkeleton } from '@/features/dashboard/AppointmentsUpcoming/AppointmentsUpcomingSkeleton';
const AppointmentsUpcoming = lazy(
  () => import('@/features/dashboard/AppointmentsUpcoming'),
);
const ActivityFeed = lazy(() => import('@/features/dashboard/ActivityFeed'));

interface DashboardPageSearchParamsProps extends SearchParams {
  status?: string;
}

const DashboardPage = async ({
  searchParams,
}: {
  searchParams?: DashboardPageSearchParamsProps;
}) => {
  const { page = PAGE_DEFAULT, status = APPOINTMENT_STATUS_OPTIONS[0].key } =
    searchParams as DashboardPageSearchParamsProps;

  const {
    id = '',
    role = ROLE.NORMAL_USER,
    username = '',
  } = (await auth())?.user || {};

  return (
    <div className="mt-7">
      <Text customClass="text-xl lg:text-2xl mb-2">
        {getGreeting()}&nbsp;
        <span className="text-sky font-bold text-2xl lg:text-3xl">
          {username}
        </span>
      </Text>
      <div className="bg-linear-banner rounded-medium relative h-fit py-3 sm:py-0 sm:h-[132px] flex flex-col-reverse sm:flex-row gap-3 items-center mr-2">
        <Button
          aria-label="close"
          isIconOnly
          size="tiny"
          color="red"
          className="absolute top-[-11px] right-[-8px] min-w-6"
        >
          <CloseIcon />
        </Button>
        <Text customClass="text-wrap text-lg lg:text-xl font-bold px-5 sm:w-[75%] text-center sm:text-left">
          WELCOME TO YOUR PERSONAL VIRTUAL HEALTH ASSISTANT
        </Text>
        <Image
          src={SRC_BANNER_AVATAR}
          alt="banner"
          width={172}
          height={200}
          className="sm:absolute sm:bottom-[-1px] sm:right-[1px]"
        />
      </div>

      <div className="flex flex-col-reverse lg:flex-row justify-between my-[31px] gap-[30px] w-full">
        <Suspense fallback={<ActivityFeedSkeleton />}>
          <ActivityFeed page={page} userId={id} role={role} />
        </Suspense>
        <Suspense
          fallback={<AppointmentsUpcomingSkeleton defaultStatus={status} />}
        >
          <AppointmentsUpcoming userId={id} role={role} status={status} />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;
