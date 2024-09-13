'use client';

import NextImage, { ImageProps } from 'next/image';
import { memo, useState } from 'react';

// Constants
import { SRC_IMAGE_NOT_AVAILABLE } from '@/constants';

const IMAGE_NOT_AVAILABLE = 'UnavailableImage';

export const Image = memo(({ className, src, alt, ...rest }: ImageProps) => {
  const [fallbackSrc, setFallbackSrc] = useState(false);

  const onError = () => setFallbackSrc(true);
  const altImage =
    src !== SRC_IMAGE_NOT_AVAILABLE && alt ? alt : IMAGE_NOT_AVAILABLE;

  return (
    <NextImage
      className={className}
      src={fallbackSrc ? SRC_IMAGE_NOT_AVAILABLE : src}
      alt={altImage}
      onError={onError}
      style={{ objectFit: 'cover' }}
      {...rest}
      priority
    />
  );
});

Image.displayName = 'Image';
