import { memo, type ReactNode } from 'react';

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

const variantClasses = {
  primary: 'text-primary-100 font-medium',
  secondary: 'text-secondary-100',
  tertiary: 'text-foreground-300',
  title: ' text-primary-100 font-semibold',
  subTitle: 'text-primary-300 font-normal',
  description: 'text-primary-200 font-medium',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-danger-100',
  default: 'text-foreground',
};

const sizeClasses = {
  '2xs': 'text-2xs',
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
};

const typeClasses = {
  nowrap: 'text-ellipsis whitespace-nowrap overflow-hidden',
  wrap: 'whitespace-pre-wrap overflow-visible',
};

export const Text = memo(
  ({
    variant = 'default',
    size,
    type = 'nowrap',
    customClass,
    children,
  }: TextProps) => {
    const classes = `${variantClasses[variant]} ${size ? sizeClasses[size] : ''} ${typeClasses[type]} ${customClass || ''}`;

    return <p className={classes}>{children}</p>;
  },
);

Text.displayName = 'Text';
