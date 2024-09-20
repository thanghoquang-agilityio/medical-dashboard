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

// Components
import { Button, Navbar } from '@/components/ui';
import { LogoutIcon, ArrowRightIcon } from '@/icons';

// Constants
import { ROUTER, SRC_LOGO } from '@/constants';

// Utils
import { cn } from '@/utils';

export const Sidebar = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <div className="fixed z-10 left-0 max-h-screen overflow-y-scroll">
      <div className="hidden lg:flex flex-col min-w-[277px] min-h-screen shadow-md font-semibold">
        <Link href={ROUTER.DASHBOARD} className="pb-4 m-auto text-center">
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
          <Button color="stone" startContent={<LogoutIcon />} className="gap-3">
            Logout
          </Button>
        </div>
      </div>

      {/* Tablet Sidebar */}
      <div className="flex">
        <div className="flex-col min-h-screen hidden md:flex lg:hidden shadow-lg">
          <div className="m-auto py-2">
            <Link href={ROUTER.DASHBOARD}>
              <Image src={SRC_LOGO} alt="logo" width={80} height={80} />
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
          className="p-0 min-w-6 mt-2 bg-linear-success rounded-none rounded-r-lg lg:hidden"
          onClick={onOpen}
        >
          <ArrowRightIcon customClass="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={cn(
          {
            'animate-slideInLeft': isOpen,
            'animate-slideInRight': !isOpen,
          },
          'm-0 sm:m-0 rounded-none max-w-[277px] lg:hidden',
        )}
        classNames={{
          base: 'absolute top-0 left-0',
          closeButton:
            'p-0 min-w-6 bg-linear-success rounded-none rounded-l-lg text-content1 top-2 right-0',
          backdrop: 'lg:hidden',
        }}
        closeButton={
          <Button onClick={onClose}>
            <ArrowRightIcon customClass="w-5 h-5 rotate-180" />
          </Button>
        }
      >
        <ModalContent>
          <ModalBody className="min-h-screen p-0 bg-background-200">
            <div className="m-auto">
              <Image src={SRC_LOGO} alt="logo" width={80} height={80} />
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
