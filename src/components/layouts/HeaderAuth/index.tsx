'use client';

import { memo, useCallback } from 'react';
import { useTheme } from 'next-themes';

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
    <header className="flex justify-between items-center lg:px-[144px] md:px-[96px] sm:px-[48px] px-[4px] py-[36px]">
      <Image
        src="/images/sidebar/logo.webp"
        alt="Brand"
        width={70}
        height={30}
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
