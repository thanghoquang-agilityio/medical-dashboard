import Image from 'next/image';

//
import { Text, Button } from '@/components/ui';
import { SRC_BANNER_AVATAR } from '@/constants';
import { CloseIcon } from '@/icons';
import ActivityFeed from '@/features/dashboard/ActivityFeed';
import AppointmentList from '@/features/appointments/AppointmentList';

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
      <Text customClass="text-lg lg:text-xl font-bold pl-[18px]">
        WELCOME TO YOUR PERSONAL VIRTUAL HEALTH ASSISTANT
      </Text>
      <Image
        src={SRC_BANNER_AVATAR}
        alt="banner"
        width={172}
        height={200}
        className="absolute bottom-0 right-0 w-[150px] h-[170px] lg:w-[172px] lg:h-[200px] object-cover"
      />
    </div>
    <div className="flex">
      <ActivityFeed notifications={[]} />
      <AppointmentList appointments={[]} />
    </div>
  </div>
);

export default DashboardPage;
