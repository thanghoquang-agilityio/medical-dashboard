import {
  Avatar as AvatarNextUI,
  AvatarProps as AvatarNextUIProps,
} from '@nextui-org/react';
import { Image } from '../Image';
import { AVATAR_THUMBNAIL } from '@/constants';

interface AvatarProps extends AvatarNextUIProps {
  size?: 'sm' | 'md' | 'lg';
  customClass?: string;
  hasBorder?: boolean;
  isShowFallback?: boolean;
}

const SIZE_CLASSES = {
  sm: 'min-w-6 w-6 h-6',
  md: 'min-w-8 w-8 h-8',
  lg: 'min-w-12 w-12 h-12',
};

export const Avatar = ({
  color,
  customClass = '',
  size = 'md',
  hasBorder = false,
  src = '',
  alt = '',
  ...rest
}: AvatarProps) => {
  const sizeClass = SIZE_CLASSES[size];
  const borderClass = hasBorder
    ? `ring-offset-0 ring-yellow ring-opacity-25 ring-4`
    : 'ring-offset-2 ring-1 ring-green';
  const backgroundClass = `bg-${color}`;

  const className =
    `${sizeClass} ${backgroundClass} ${borderClass} ${customClass}`.trim();

  const classNames = {
    base: className,
  };
  return (
    <>
      <span
        tabIndex={-1}
        className="relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny text-default-foreground rounded-full ring-offset-background dark:ring-offset-background-dark min-w-8 w-8 h-8 bg-undefined ring-offset-2 ring-1 ring-green shrink-0 hidden sm:block"
      >
        <Image
          width={32}
          height={32}
          src={src}
          alt={alt}
          blurDataURL={AVATAR_THUMBNAIL}
          fallbackImg={AVATAR_THUMBNAIL}
        />
      </span>

      <AvatarNextUI {...rest} classNames={classNames} />
    </>
  );
};

Avatar.displayName = 'Avatar';
