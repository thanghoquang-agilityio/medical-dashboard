'use client';
import { memo } from 'react';
import dynamic from 'next/dynamic';

// Constants
import { SRC_LOGO } from '@/constants';

// Components
import { Image, SwitchThemeSkeleton } from '@/components/ui';

const SwitchTheme = dynamic(
  () =>
    import('../../ui/SwitchTheme/index').then((module) => module.SwitchTheme),
  {
    ssr: false,
    loading: () => <SwitchThemeSkeleton />,
  },
);

export const HeaderAuth = memo(() => {
  return (
    <header className="flex justify-between items-center lg:px-[144px] md:px-24 sm:px-12 px-5 py-9">
      <Image
        src={SRC_LOGO}
        alt="Brand"
        className="lg:w-20 lg:h-20 sm:w-16 sm:h-16 w-12 h-12"
        width={80}
        height={80}
      />

      <SwitchTheme />
    </header>
  );
});

HeaderAuth.displayName = 'HeaderAuth';
