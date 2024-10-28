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
    <header className="flex justify-between items-center px-5 py-9 relative z-30">
      <Image
        src={SRC_LOGO}
        alt="Brand"
        className="lg:w-14 lg:h-14 sm:w-12 sm:h-12 w-8 h-8"
        width={80}
        height={80}
      />
      <SwitchTheme customClass="sm:text-white" />
    </header>
  );
});

HeaderAuth.displayName = 'HeaderAuth';
