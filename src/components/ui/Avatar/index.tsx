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
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export const Avatar = ({
  color,
  customClass = '',
  size = 'md',
  hasBorder = false,
  ...rest
}: AvatarProps) => {
  const sizeClass = SIZE_CLASSES[size];
  const borderClass = hasBorder
    ? `border-2 border-${color} border-opacity-25`
    : '';
  const backgroundClass = `bg-${color}`;

  const className =
    `${sizeClass} ${backgroundClass} ${borderClass} ${customClass}`.trim();

  const classNames = {
    base: className,
  };

  return <AvatarNextUI classNames={classNames} {...rest} />;
};

Avatar.displayName = 'Avatar';
