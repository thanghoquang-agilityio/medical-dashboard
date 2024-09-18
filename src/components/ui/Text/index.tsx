import { memo, type ReactNode } from 'react';
import { TYPE_CLASSES } from '@/constants';

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
    | 'default';
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
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
};

const SIZE_CLASSES = {
  '2xs': 'text-2xs',
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
};

export const Text = memo(
  ({
    variant = 'default',
    size,
    type = 'nowrap',
    customClass,
    children,
  }: TextProps) => {
    const classes = `${VARIANT_CLASSES[variant]} ${size ? SIZE_CLASSES[size] : ''} ${TYPE_CLASSES[type]} ${customClass || ''}`;

    return <p className={classes}>{children}</p>;
  },
);

Text.displayName = 'Text';
