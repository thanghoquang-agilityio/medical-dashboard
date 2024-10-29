'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import NextImage, { ImageProps } from 'next/image';

// Constants
import { AVATAR_THUMBNAIL, AVATAR_BLUR } from '@/constants';

interface ImageFallbackProps extends ImageProps {
  src: string;
  alt: string;
  blurDataURL?: string;
  fallbackSrc?: string;
}

const ImageFallback = ({
  src,
  alt,
  blurDataURL = AVATAR_BLUR,
  fallbackSrc = AVATAR_THUMBNAIL,
  ...rest
}: ImageFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

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
      {...rest}
    />
  );
};

export const Image = memo(ImageFallback);
