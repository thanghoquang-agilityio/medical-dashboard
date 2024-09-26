'use client';

import { useState } from 'react';
import { Divider } from '@nextui-org/react';
import Link from 'next/link';

// Components
import { Button, Image, Navbar, Spinner } from '@/components/ui';
import { LogoutIcon } from '@/icons';

// Constants
import { AUTH_ROUTES, PRIVATE_ROUTES, SRC_LOGO } from '@/constants';

// Services
import { logout } from '@/services';

export const Sidebar = () => {
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);
    await logout();
    location.replace(AUTH_ROUTES.LOGIN);
  };

  return (
    <>
      {isPending && (
        <>
          <div className="absolute inset-0 z-40 w-screen h-screen bg-primary-100 opacity-30" />
          <Spinner size="lg" />
        </>
      )}
      <div className="fixed z-10 max-h-screen overflow-y-scroll">
        <div className="hidden lg:flex flex-col min-w-[277px] min-h-screen shadow-md font-semibold bg-background-200">
          <Link
            href={PRIVATE_ROUTES.DASHBOARD}
            className="py-8 m-auto text-center"
          >
            <Image src={SRC_LOGO} alt="logo" width={50} height={50} />
          </Link>

          <div className="flex-1">
            <Navbar isExpandSidebar />
          </div>

          <Divider className="bg-primary-100 h-[2px] mt-8 opacity-80" />
          <div className="ml-10 py-[76px]">
            <Button
              color="default"
              startContent={<LogoutIcon customClass="w-[44px] h-[44px]" />}
              className="gap-6 font-bold text-xl"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Tablet Sidebar */}
        <div className="flex">
          <div className="flex-col min-h-screen hidden md:flex lg:hidden shadow-lg bg-background-200">
            <div className="m-auto py-6">
              <Link href={PRIVATE_ROUTES.DASHBOARD}>
                <Image src={SRC_LOGO} alt="logo" width={35} height={35} />
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
                onClick={handleLogout}
              >
                <LogoutIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
