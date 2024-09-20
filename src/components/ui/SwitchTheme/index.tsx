'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

// Icons
import { BrightnessIcon, MoonIcon } from '@/icons';

// Components
import { Button, Spinner } from '@/components/ui';

const SwitchTheme = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const onSwitchTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  // useEffect only runs on the client, so now we can safely show the UI
  // reference: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#avoid-hydration-mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="relative w-8 h-8">
        <Spinner size="sm" />
      </div>
    );

  return (
    <Button
      isIconOnly
      onClick={onSwitchTheme}
      className=" p-0 min-w-8 h-8 text-primary-300"
    >
      {theme === 'light' ? (
        <MoonIcon customClass="w-auto" />
      ) : (
        <BrightnessIcon customClass="w-auto" />
      )}
    </Button>
  );
};

SwitchTheme.displayName = 'SwitchTheme';
export default SwitchTheme;