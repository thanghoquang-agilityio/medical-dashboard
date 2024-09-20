'use client';

import { memo, useCallback } from 'react';
import { useTheme } from 'next-themes';

// Constants
import { SRC_BRAND_AUTH } from '@/constants';

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
    <header className="flex justify-between lg:px-[144px] md:px-[96px] sm:px-[48px] px-[4px] py-[36px]">
      <Image
        src={SRC_BRAND_AUTH}
        alt="Brand"
        className="w-[158px] h-8"
        width={158}
        height={32}
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
