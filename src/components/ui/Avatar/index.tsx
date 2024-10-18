import { AvatarProps as AvatarNextUIProps } from '@nextui-org/react';

// Components
import { Image } from '../Image';

// Constants
import { AVATAR_THUMBNAIL } from '@/constants';

interface AvatarProps extends AvatarNextUIProps {
  size?: 'sm' | 'md' | 'lg';
  customClass?: string;
  isCustomBordered?: boolean;
  isShowFallback?: boolean;
}

const SIZE_CLASSES = {
  sm: 'min-w-6 w-6 h-6',
  md: 'min-w-8 w-8 h-8',
  lg: 'min-w-12 w-12 h-12',
};

export const Avatar = ({
  color,
  isCustomBordered = false,
  customClass = '',
  size = 'md',
  src = '',
  alt = '',
  isBordered = false,
}: AvatarProps) => {
  const sizeClass = SIZE_CLASSES[size];
  const borderClass = isBordered
    ? 'ring-offset-2 ring-1 ring-green'
    : 'ring-offset-0 ring-0';

  const customBorderedClass =
    isCustomBordered && 'ring-offset-0 ring-yellow ring-opacity-25 ring-4';

  const backgroundClass = `bg-${color}`;

  const className =
    `${sizeClass} ${backgroundClass} ${borderClass} ${customBorderedClass} ${customClass}`.trim();

  return (
    <span
      tabIndex={-1}
      className={`box-border overflow-hidden outline-none rounded-full ring-offset-background dark:ring-offset-background-dark shrink-0 ${className}`}
    >
      <Image
        width={48}
        height={48}
        src={src}
        alt={alt}
        blurDataURL={AVATAR_THUMBNAIL}
        fallbackImg={AVATAR_THUMBNAIL}
      />
    </span>
  );
};

Avatar.displayName = 'Avatar';
