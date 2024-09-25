'use client';

import Image from 'next/image';
import { Divider } from '@nextui-org/react';
import Link from 'next/link';

// Components
import { Button, Navbar, Spinner } from '@/components/ui';
import { LogoutIcon } from '@/icons';

// Constants
import { AUTH_ROUTES, PRIVATE_ROUTES, SRC_LOGO } from '@/constants';

// Utils
import { logout } from '@/actions/auth';
import { useState } from 'react';

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
            className="pb-4 m-auto text-center"
          >
            <Image src={SRC_LOGO} alt="logo" width={100} height={100} />
          </Link>

          <div className="flex-1">
            <Navbar isExpandSidebar />
          </div>

          <Divider className="bg-primary-100 h-[2px] mt-8" />
          <div className="m-auto py-6">
            <Button
              color="stone"
              startContent={<LogoutIcon />}
              className="gap-3"
              onClick={handleLogout}
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
