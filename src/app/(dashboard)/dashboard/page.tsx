import Image from 'next/image';

// Components
import { Text, Button } from '@/components/ui';
import { CloseIcon } from '@/icons';
import ActivityFeed from '@/features/dashboard/ActivityFeed';
import AppointmentsUpcoming from '@/features/dashboard/AppointmentsUpcoming';

// Components
import { SRC_BANNER_AVATAR } from '@/constants';

// Mocks
import { MOCK_APPOINTMENTS, MOCK_NOTIFICATION_LIST } from '@/mocks';

const DashboardPage = () => (
  <div>
    <Text customClass="text-xl lg:text-2xl mb-6">
      Good Morning
      {/* TODO: will handle show username */}
      <span className="text-sky font-bold text-xl lg:text-2xl"> John Doe</span>
    </Text>
    <div className="bg-linear-banner rounded-medium relative h-[132px] flex items-center m-auto">
      <Button
        isIconOnly
        size="tiny"
        color="red"
        className="absolute top-[-11px] right-[-8px] min-w-6"
      >
        <CloseIcon />
      </Button>
      <Text customClass="text-md text-wrap md:text-lg lg:text-xl font-bold pl-[18px] w-[80%]">
        WELCOME TO YOUR PERSONAL VIRTUAL HEALTH ASSISTANT
      </Text>
      <Image
        src={SRC_BANNER_AVATAR}
        alt="banner"
        width={172}
        height={200}
        className="absolute bottom-0 right-0 w-[120px] h-[150px] md:w-[150px] md:h-[170px] lg:w-[172px] lg:h-[200px] object-cover"
      />
    </div>
    <div className="flex flex-col-reverse  lg:flex-row justify-between my-[31px] gap-[30px] w-full">
      {/* TODO: will handle call API later */}
      <ActivityFeed notifications={MOCK_NOTIFICATION_LIST} />
      <AppointmentsUpcoming appointments={MOCK_APPOINTMENTS} />
    </div>
  </div>
);

export default DashboardPage;
