'use client';

import NextImage, { ImageProps } from 'next/image';
import { memo, useCallback, useEffect, useState } from 'react';

// Constants
import { AVATAR_THUMBNAIL, SRC_IMAGE_NOT_AVAILABLE } from '@/constants';

const IMAGE_NOT_AVAILABLE = 'UnavailableImage';

export const Image = memo(
  ({
    className,
    src,
    alt,
    fallbackImg = AVATAR_THUMBNAIL,
    ...rest
  }: ImageProps & { fallbackImg?: string }) => {
    const [fallbackSrc, setFallbackSrc] = useState(false);

    const handleError = () => setFallbackSrc(true);
    const altImage =
      src !== SRC_IMAGE_NOT_AVAILABLE && alt ? alt : IMAGE_NOT_AVAILABLE;

    useEffect(() => {
      setFallbackSrc(false);
    }, [src]);

    const handleLoad = useCallback(
      (event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.currentTarget;
        if (img.naturalWidth === 0) setFallbackSrc(true);
      },
      [fallbackSrc],
    );

    return (
      <NextImage
        className={className}
        src={fallbackSrc ? fallbackImg || SRC_IMAGE_NOT_AVAILABLE : src}
        alt={altImage}
        onError={handleError}
        style={{ objectFit: 'cover' }}
        priority
        onLoad={handleLoad}
        {...rest}
      />
    );
  },
);

Image.displayName = 'Image';
