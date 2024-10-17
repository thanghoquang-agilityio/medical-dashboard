'use client';

import NextImage, { ImageProps } from 'next/image';
import { memo, useState } from 'react';

// Constants
import { SRC_IMAGE_NOT_AVAILABLE } from '@/constants';

const IMAGE_NOT_AVAILABLE = 'UnavailableImage';

export const Image = memo(
  ({
    className,
    src,
    alt,
    fallbackImg,
    ...rest
  }: ImageProps & { fallbackImg?: string }) => {
    const [fallbackSrc, setFallbackSrc] = useState(false);

    const handleError = () => setFallbackSrc(true);
    const altImage =
      src !== SRC_IMAGE_NOT_AVAILABLE && alt ? alt : IMAGE_NOT_AVAILABLE;

    return (
      <NextImage
        className={className}
        src={fallbackSrc ? fallbackImg || SRC_IMAGE_NOT_AVAILABLE : src}
        alt={altImage}
        onError={handleError}
        style={{ objectFit: 'cover' }}
        priority
        {...rest}
      />
    );
  },
);

Image.displayName = 'Image';
