'use client';

import { Switch as SwitchNextUI } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { ReactNode, useCallback } from 'react';

interface SwitchProps {
  startIcon: ReactNode;
  endIcon: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'default' | 'success' | 'warning';
}

export const Switch = ({
  startIcon,
  endIcon,
  color = 'default',
  size = 'md',
}: SwitchProps) => {
  const { theme, setTheme } = useTheme();

  const onSwitchTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  return (
    <SwitchNextUI
      defaultSelected
      size={size}
      color={color}
      onValueChange={onSwitchTheme}
      thumbIcon={({ isSelected }) => (isSelected ? startIcon : endIcon)}
    />
  );
};

Switch.displayName = 'Switch';
