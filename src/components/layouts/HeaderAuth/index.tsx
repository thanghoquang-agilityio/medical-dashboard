'use client';
import { memo } from 'react';
import dynamic from 'next/dynamic';

// Constants
import { SRC_LOGO } from '@/constants';

// Components
import { Image } from '@/components/ui';

const SwitchTheme = dynamic(() => import('@/components/ui/SwitchTheme'));

export const HeaderAuth = memo(() => {
  return (
    <header className="flex justify-between items-center lg:px-[144px] md:px-24 sm:px-12 px-5 py-9">
      <Image
        src={SRC_LOGO}
        alt="Brand"
        className="lg:w-14 lg:h-14 sm:w-12 sm:h-12 w-8 h-8"
        width={80}
        height={80}
      />

      <SwitchTheme />
    </header>
  );
});

HeaderAuth.displayName = 'HeaderAuth';
