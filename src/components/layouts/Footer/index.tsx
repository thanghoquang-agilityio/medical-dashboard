'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// Components
import { Image } from '@/components/ui';

// Constants
import { FOOTER_IMAGES, FOOTER_ITEMS } from '@/constants';
import { THEME_MODE_TYPE } from '@/types';

// Utils
import { cn } from '@/utils';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  // reference: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#avoid-hydration-mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // TODO: update skeleton for it
  if (!mounted) return null;

  // Filter the image to change the color of the image to display the image in different modes
  const imageFilter =
    theme === THEME_MODE_TYPE.LIGHT
      ? 'invert(100%) sepia(100%) saturate(250%) hue-rotate(90deg) contrast(700%)'
      : '';

  return (
    <div className="container w-full m-h-40 mt-auto flex justify-center items-center flex-col gap-10 bg-background-100 py-4">
      <Image
        src={FOOTER_IMAGES.localName}
        alt="VHA partners"
        width={180}
        height={19}
        style={{
          filter: imageFilter,
        }}
      />
      <div className="grid sm:grid-cols-6 grid-cols-3 gap-2">
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
