'use client';

import { memo, useCallback } from 'react';
import { useTheme } from 'next-themes';

// Constants
import { SRC_LOGO } from '@/constants';

// Components
import { Image } from '@/components/ui/Image';
import { Button } from '@/components/ui';
import { BrightnessIcon, MoonIcon } from '@/icons';

export const HeaderAuth = memo(() => {
  const { theme, setTheme } = useTheme();

  const onSwitchTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  return (
    <header className="flex justify-between items-center lg:px-[144px] md:px-24 sm:px-12 px-5 py-9">
      <Image
        src={SRC_LOGO}
        alt="Brand"
        className="lg:w-20 lg:h-20 sm:w-16 sm:h-16 w-12 h-12"
        width={80}
        height={80}
      />
      <Button
        isIconOnly
        onClick={onSwitchTheme}
        className="p-0 min-w-8 h-8 text-primary-300"
      >
        {theme === 'light' ? (
          <MoonIcon customClass="w-auto" />
        ) : (
          <BrightnessIcon customClass="w-auto" />
        )}
      </Button>
    </header>
  );
});

HeaderAuth.displayName = 'HeaderAuth';
