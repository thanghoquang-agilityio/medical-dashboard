'use client';

import Image from 'next/image';
import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import Link from 'next/link';
import { clsx } from 'clsx';

// Components
import { Button, Navbar } from '@/components/ui';
import { LogoutIcon, LogoIcon, ArrowRightIcon } from '@/icons';

// Constants
import { ROUTER } from '@/constants';

export const Sidebar = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <div>
      <div className="hidden lg:flex flex-col min-h-screen pt-[30px] shadow-md font-semibold">
        {/* TODO: will add logo later */}
        <Link href={ROUTER.DASHBOARD} className="pl-28 pb-4">
          <LogoIcon />
        </Link>

        <div className="flex-1">
          <Navbar isExpandSidebar />
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            <Image
              src="/images/sidebar/emergency-sidebar.webp"
              alt="emergency"
              width={200}
              height={200}
            />
            <Button
              color="secondary"
              className="absolute bottom-[10px] left-[32px]"
            >
              Call Emergency
            </Button>
          </div>
          <Divider className="bg-primary-100 h-[2px] mt-8" />
        </div>
        <div className="flex flex-col items-center py-10">
          <Button color="stone" startContent={<LogoutIcon />} className="gap-3">
            Logout
          </Button>
        </div>
      </div>

      {/* Tablet Sidebar */}
      <div className="flex">
        <div className="flex-col min-h-screen hidden md:flex lg:hidden shadow-lg">
          <div className="flex flex-col items-center py-2">
            {/* TODO: will add logo later */}
            <Link
              href={ROUTER.DASHBOARD}
              className="w-[80px] h-[45px] px-6 bg-green"
            >
              {''}
            </Link>
          </div>

          <div className="flex-1">
            <Navbar />
          </div>

          <div className="py-5">
            <Button color="stone" isIconOnly className="w-6 h-6">
              <LogoutIcon />
            </Button>
          </div>
        </div>

        <Button
          className="p-0 min-w-6 bg-linear-success rounded-none rounded-r-lg lg:hidden"
          onClick={onOpen}
        >
          <ArrowRightIcon customClass="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={clsx(
          {
            'animate-slideInLeft': isOpen,
            'animate-slideInRight': !isOpen,
          },
          'm-0 sm:m-0 rounded-none max-w-[277px] lg:hidden',
        )}
        classNames={{
          base: 'absolute top-0 left-0',
          closeButton:
            'p-0 min-w-6 bg-linear-success rounded-none rounded-l-lg text-content1 top-0 right-0',
          backdrop: 'lg:hidden',
        }}
        closeButton={
          <Button onClick={onClose}>
            <ArrowRightIcon customClass="w-5 h-5 rotate-180" />
          </Button>
        }
      >
        <ModalContent>
          <ModalBody className="min-h-screen p-0">
            {/* TODO: will add logo later */}
            <div className="flex flex-col items-center pt-2">
              <Link
                href={ROUTER.DASHBOARD}
                className="w-[80px] h-[45px] px-6 bg-green"
              >
                {''}
              </Link>
            </div>
            <div className="flex-1">
              <Navbar isExpandSidebar />
            </div>
            <div className="pl-3 py-10">
              <Button
                color="stone"
                startContent={<LogoutIcon />}
                className="gap-3"
              >
                Logout
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
