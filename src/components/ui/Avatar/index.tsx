import {
  Avatar as AvatarNextUI,
  AvatarProps as AvatarNextUIProps,
} from '@nextui-org/react';

interface AvatarProps extends AvatarNextUIProps {
  size?: 'sm' | 'md' | 'lg';
  customClass?: string;
  hasBorder?: boolean;
}

const SIZE_CLASSES = {
  sm: 'w-6 h-6',
  md: 'w-7 h-7',
  lg: 'w-12 h-12',
};

export const Avatar = ({
  color,
  customClass = '',
  size = 'md',
  hasBorder = false,
  ...rest
}: AvatarProps) => {
  const classes = {
    base: `${SIZE_CLASSES[size]} bg-${color} ${hasBorder ? `border-2 border-${color} border-opacity-25` : ''} ${customClass}`,
  };

  return <AvatarNextUI classNames={classes} {...rest} />;
};

Avatar.displayName = 'Avatar';
