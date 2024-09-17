'use client';

import { memo, useCallback } from 'react';
import { useTheme } from 'next-themes';

// Constants
import { SRC_BRAND_AUTH } from '@/constants';

// Components
import { Image } from '@/components/ui/Image';
import { Button } from '@/components/ui';
import { DarkIcon, LightIcon } from '@/icons';

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
        size="xs"
        isIconOnly
        className="p-0 h-8 rounded-full w-fit"
        onClick={onSwitchTheme}
      >
        {theme === 'light' ? <DarkIcon /> : <LightIcon />}
      </Button>
    </header>
  );
});

HeaderAuth.displayName = 'HeaderAuth';
