'use client';

import Image from 'next/image';
import { Divider } from '@nextui-org/react';
import Link from 'next/link';

// Components
import { Button, Navbar } from '@/components/ui';
import { LogoutIcon } from '@/icons';

// Constants
import { AUTH_ROUTES, PRIVATE_ROUTES, SRC_LOGO } from '@/constants';

// Utils
import { logout } from '@/actions/auth';

export const Sidebar = () => {
  const onLogout = async () => {
    await logout();
    location.replace(AUTH_ROUTES.LOGIN);
  };

  return (
    <div className="fixed z-10 max-h-screen overflow-y-scroll">
      <div className="hidden lg:flex flex-col min-w-[277px] min-h-screen shadow-md font-semibold bg-background-200">
        <Link
          href={PRIVATE_ROUTES.DASHBOARD}
          className="pb-4 m-auto text-center"
        >
          <Image src={SRC_LOGO} alt="logo" width={100} height={100} />
        </Link>

        <div className="flex-1">
          <Navbar isExpandSidebar />
        </div>

        <div className="flex px-4 flex-col items-center">
          <div className="relative">
            <Image
              src="/images/sidebar/emergency-sidebar.webp"
              alt="emergency"
              width={200}
              height={200}
            />
            <Button color="secondary" className="absolute bottom-[10px] left-8">
              Call Emergency
            </Button>
          </div>
        </div>
        <Divider className="bg-primary-100 h-[2px] mt-8" />
        <div className="m-auto py-6">
          <Button
            color="stone"
            startContent={<LogoutIcon />}
            className="gap-3"
            onClick={onLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Tablet Sidebar */}
      <div className="flex">
        <div className="flex-col min-h-screen hidden md:flex lg:hidden shadow-lg bg-background-200">
          <div className="m-auto py-2">
            <Link href={PRIVATE_ROUTES.DASHBOARD}>
              <Image src={SRC_LOGO} alt="logo" width={80} height={80} />
            </Link>
          </div>

          <div className="flex-1">
            <Navbar />
          </div>

          <div className="py-5">
            <Button
              color="stone"
              isIconOnly
              className="w-6 h-6"
              onClick={onLogout}
            >
              <LogoutIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
