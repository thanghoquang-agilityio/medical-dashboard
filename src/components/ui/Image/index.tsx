'use client';

import { memo, useCallback, useState } from 'react';
import NextImage, { ImageProps } from 'next/image';

// Constants
import { IMAGE_DEFAULT } from '@/constants';

interface ImageFallbackProps extends ImageProps {
  src: string;
  alt: string;
  blurDataURL?: string;
  fallbackSrc?: string;
}

const ImageFallback = ({
  src,
  alt,
  blurDataURL = IMAGE_DEFAULT.blur,
  fallbackSrc = IMAGE_DEFAULT.url,
  ...rest
}: ImageFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleFallbackImage = useCallback(
    () => setImgSrc(fallbackSrc),
    [fallbackSrc],
  );

  const handleLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      const img = event.currentTarget;
      if (img.naturalWidth === 0) setImgSrc(fallbackSrc);
    },
    [fallbackSrc],
  );

  return (
    <NextImage
      priority
      src={imgSrc}
      alt={alt}
      placeholder="blur"
      blurDataURL={blurDataURL}
      onLoad={handleLoad}
      onError={handleFallbackImage}
      style={{ objectFit: 'cover' }}
      {...rest}
    />
  );
};

export const Image = memo(ImageFallback);
