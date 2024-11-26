'use client';

import { useState } from 'react';
import { Divider } from '@nextui-org/react';
import Link from 'next/link';

// Components
import { Button, Image, Navbar, Spinner } from '@/components/ui';
import { LogoutIcon } from '@/icons';

// Constants
import { PRIVATE_ROUTES, ROUTE_ENDPOINT, SRC_LOGO } from '@/constants';

export const Sidebar = () => {
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);

    const response = await fetch(ROUTE_ENDPOINT.AUTH.LOGOUT, {
      method: 'POST',
    });

    const url: string = await response.json();

    location.replace(url);
  };

  return (
    <>
      {isPending && (
        <>
          <div className="fixed inset-0 z-40 w-screen h-screen bg-primary-100 opacity-30" />
          <Spinner size="lg" className="fixed" />
        </>
      )}
      <aside className="fixed z-10 max-h-screen overflow-y-scroll">
        <section className="hidden lg:flex flex-col min-w-[277px] min-h-screen shadow-md font-semibold bg-background-200">
          <h1 className="py-8 m-auto text-center">
            <Link href={PRIVATE_ROUTES.DASHBOARD}>
              <Image
                src={SRC_LOGO}
                alt="logo"
                width={50}
                height={50}
                className="w-full h-auto"
                placeholder="empty"
              />
            </Link>
          </h1>
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
        </section>

        {/* Tablet Sidebar */}
        <section className="flex-col min-h-screen hidden md:flex lg:hidden shadow-lg bg-background-200">
          <h1 className="m-auto py-6 text-center">
            <Link href={PRIVATE_ROUTES.DASHBOARD}>
              <Image
                src={SRC_LOGO}
                alt="logo"
                width={35}
                height={35}
                placeholder="empty"
              />
            </Link>
          </h1>

          <div className="flex-1">
            <Navbar />
          </div>

          <div className="py-5 flex justify-center">
            <Button
              aria-label="logout button"
              color="stone"
              isIconOnly
              className="w-6 h-6"
              onClick={handleLogout}
            >
              <LogoutIcon />
            </Button>
          </div>
        </section>
      </aside>
    </>
  );
};
