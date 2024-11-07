import { Suspense } from 'react';
import { Metadata } from 'next';
import { auth } from '@/config/auth';

// Constants
import {
  APPOINTMENT_STATUS_OPTIONS,
  PAGE_DEFAULT,
  SRC_BANNER_AVATAR,
} from '@/constants';

// Types
import { SearchParams } from '@/types';

// Utils
import { getGreeting } from '@/utils';

// Components
import { Text, Image } from '@/components/ui';
import { ActivityFeedSkeleton } from '@/features/dashboard/ActivityFeed/ActivityFeedSkeleton';
import { AppointmentsUpcomingSkeleton } from '@/features/dashboard/AppointmentsUpcoming/AppointmentsUpcomingSkeleton';
import ActivityFeed from '@/features/dashboard/ActivityFeed';
import AppointmentsUpcoming from '@/features/dashboard/AppointmentsUpcoming';

// Services
import { getUserLogged } from '@/services';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page for Medical Dashboard',
};

interface DashboardPageSearchParamsProps extends SearchParams {
  status?: string;
}

const DashboardPage = async ({
  searchParams,
}: {
  searchParams?: DashboardPageSearchParamsProps;
}) => {
  const { page = PAGE_DEFAULT, status = APPOINTMENT_STATUS_OPTIONS[0].key } =
    searchParams || {};

  const { token = '' } = (await auth())?.user || {};
  const { user: userLogged } = await getUserLogged(token);
  const { username = '' } = userLogged || {};

  return (
    <div className="mt-7">
      <Text customClass="text-xl lg:text-2xl lg:leading-9 mb-2">
        {getGreeting()}&nbsp;
        <span className="text-secondary-100 font-bold text-2xl lg:text-3xl">
          {username}
        </span>
      </Text>
      <div className="bg-linear-banner rounded-medium relative h-fit py-3 sm:py-0 sm:h-[132px] flex flex-col-reverse sm:flex-row gap-3 items-center">
        <Text customClass="text-wrap text-lg lg:text-xl font-bold px-5 sm:w-[75%] text-center sm:text-left">
          WELCOME TO YOUR PERSONAL VIRTUAL HEALTH ASSISTANT
        </Text>
        <Image
          src={SRC_BANNER_AVATAR}
          alt="banner"
          width={172}
          height={200}
          className="sm:absolute sm:bottom-[-1px] sm:right-[1px]"
          placeholder="empty"
        />
      </div>

      <div className="flex flex-col-reverse xl:flex-row justify-between mt-8 gap-8 w-full">
        <Suspense fallback={<ActivityFeedSkeleton />}>
          <ActivityFeed page={page} userLogged={userLogged} />
        </Suspense>
        <Suspense
          fallback={<AppointmentsUpcomingSkeleton defaultStatus={status} />}
        >
          <AppointmentsUpcoming userLogged={userLogged} status={status} />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;
