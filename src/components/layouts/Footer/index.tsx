'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// Components
import { Image, Text } from '@/components/ui';
import { FooterSkeleton } from './FooterSkeleton';

// Constants
import { FOOTER_IMAGES } from '@/constants';
import { THEME_MODE_TYPE } from '@/types';

// Utils
import { cn } from '@/utils';

export const FOOTER_ITEMS = [
  {
    src: FOOTER_IMAGES.near,
    alt: 'Near',
  },
  {
    src: FOOTER_IMAGES.binanceChain,
    alt: 'Binance Chain',
  },
  {
    src: FOOTER_IMAGES.coinbase,
    alt: 'Coinbase',
  },
  {
    src: FOOTER_IMAGES.zerion,
    alt: 'Zerion',
  },
  {
    src: FOOTER_IMAGES.zapper,
    alt: 'Zapper',
  },
  {
    src: FOOTER_IMAGES.instaoapp,
    alt: 'Instaoapp',
  },
];

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  // reference: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#avoid-hydration-mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <FooterSkeleton />;

  // Filter the image to change the color of the image to display the image in different modes
  const imageFilter =
    theme === THEME_MODE_TYPE.LIGHT
      ? 'invert(100%) sepia(100%) saturate(250%) hue-rotate(90deg) contrast(700%)'
      : '';

  return (
    <div className="w-full m-h-40 mt-auto flex justify-center items-center flex-col gap-8 bg-background-100 pt-8 pb-4">
      <Text variant="success" size="2xl" customClass="font-semibold">
        VHA <span className="text-primary-100">PARTNER</span>
      </Text>
      <div className="grid xl:grid-cols-6 grid-cols-3 gap-2">
        {FOOTER_ITEMS.map(({ src, alt }, index) => (
          <div
            key={src}
            className={cn(
              'w-auto md:w-[124px] md:h-[60px] flex justify-center items-center',
              index % 2 === 0 ? 'bg-transparent' : 'bg-background-400',
            )}
          >
            <Image
              src={src}
              alt={alt}
              width={96}
              height={36}
              style={{
                filter: imageFilter,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

Footer.displayName = 'Footer';
export default Footer;
