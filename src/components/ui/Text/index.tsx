import { memo, type ReactNode } from 'react';
import { TYPE_CLASSES } from '@/constants';
import { cn } from '@/utils';

interface TextProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'title'
    | 'subTitle'
    | 'description'
    | 'success'
    | 'warning'
    | 'error'
    | 'action'
    | 'default';
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  type?: 'nowrap' | 'wrap';
  customClass?: string;
  children: ReactNode;
}

const VARIANT_CLASSES = {
  primary: 'text-primary-100 font-medium',
  secondary: 'text-secondary-100',
  tertiary: 'text-secondary-300',
  title: ' text-primary-100 font-semibold',
  subTitle: 'text-primary-300 font-normal',
  description: 'text-primary-200 font-medium',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-danger-100',
  default: 'text-foreground',
  action: 'text-minty-green font-medium',
};

const SIZE_CLASSES = {
  '2xs': 'text-2xs',
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

export const Text = memo(
  ({
    variant = 'default',
    size,
    type = 'nowrap',
    customClass,
    children,
  }: TextProps) => (
    <p
      className={cn(
        `${VARIANT_CLASSES[variant]} ${size ? SIZE_CLASSES[size] : ''} ${TYPE_CLASSES[type]} ${customClass || ''}`,
      )}
    >
      {children}
    </p>
  ),
);

Text.displayName = 'Text';
