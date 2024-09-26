// Components
import { Text, Button, Image } from '@/components/ui';
import { CloseIcon } from '@/icons';
import ActivityFeed from '@/features/dashboard/ActivityFeed';
import AppointmentsUpcoming from '@/features/dashboard/AppointmentsUpcoming';

// Components
import { SRC_BANNER_AVATAR } from '@/constants';

// Mocks
import { MOCK_APPOINTMENTS, MOCK_NOTIFICATION_LIST } from '@/mocks';

// Utils
import { getGreeting } from '@/utils';

const DashboardPage = () => (
  <div className="mt-7">
    <Text customClass="text-xl lg:text-2xl mb-2">
      {getGreeting()}
      {/* TODO: will handle show username */}
      <span className="text-sky font-bold text-2xl lg:text-3xl"> John Doe</span>
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
    <div className="flex flex-col-reverse  lg:flex-row justify-between my-[31px] gap-[30px] w-full">
      {/* TODO: will handle call API later */}
      <ActivityFeed notifications={MOCK_NOTIFICATION_LIST} />
      <AppointmentsUpcoming appointments={MOCK_APPOINTMENTS} />
    </div>
  </div>
);

export default DashboardPage;
