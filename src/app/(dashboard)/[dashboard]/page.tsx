import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { auth } from '@/config/auth';

// Components
import { Text, Button, Spinner, Image } from '@/components/ui';
import { CloseIcon } from '@/icons';
const AppointmentsUpcoming = dynamic(
  () => import('@/features/dashboard/AppointmentsUpcoming'),
);
const ActivityFeed = dynamic(() => import('@/features/dashboard/ActivityFeed'));

// Constants
import { PAGE_DEFAULT, ROLE, SRC_BANNER_AVATAR } from '@/constants';

// Types
import { SearchParams } from '@/types';

// Utils
import { getGreeting } from '@/utils';

import { MOCK_APPOINTMENTS } from '@/mocks';

const DashboardPage = async ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) => {
  const { page = PAGE_DEFAULT } = searchParams as SearchParams;

  const {
    id = '',
    role = ROLE.USER,
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
        <Suspense fallback={<Spinner />}>
          <ActivityFeed page={page} id={id} role={role} />
        </Suspense>
        <AppointmentsUpcoming appointments={MOCK_APPOINTMENTS} />
      </div>
    </div>
  );
};

export default DashboardPage;
