'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

// Icons
import { BrightnessIcon, MoonIcon } from '@/icons';

// Components
import { Button } from '@/components/ui';

// Types
import { THEME_MODE_TYPE } from '@/types';

// Utils
import { cn } from '@/utils';

const SwitchTheme = ({ customClass = '' }: { customClass?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSwitchTheme = useCallback(() => {
    setTheme(
      theme === THEME_MODE_TYPE.LIGHT
        ? THEME_MODE_TYPE.DARK
        : THEME_MODE_TYPE.LIGHT,
    );
  }, [setTheme, theme]);

  // useEffect only runs on the client, so now we can safely show the UI
  // reference: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#avoid-hydration-mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      aria-label="switch theme"
      isIconOnly
      onClick={handleSwitchTheme}
      className={cn('p-0 min-w-6 w-6 h-6 text-primary-300 mb-0.5', customClass)}
    >
      {theme === THEME_MODE_TYPE.LIGHT ? (
        <MoonIcon customClass="w-auto" />
      ) : (
        <BrightnessIcon customClass="w-auto" />
      )}
    </Button>
  );
};

SwitchTheme.displayName = 'SwitchTheme';
export default SwitchTheme;
