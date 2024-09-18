'use client';

import { useTheme } from 'next-themes';

// Components
import { Image } from '@/components/ui';

// Constants
import { FOOTER_IMAGES, FOOTER_ITEMS } from '@/constants';

// Utils
import { cn } from '@/utils';

export const Footer = () => {
  const { theme } = useTheme();

  // Filter the image to change the color of the image to display the image in different modes
  const imageFilter =
    theme === 'light'
      ? 'invert(100%) sepia(0%) saturate(0%) hue-rotate(308deg) brightness(105%) contrast(102%)'
      : '';

  return (
    <div className="w-full m-h-40 flex justify-center items-center flex-col gap-10 bg-background-200 py-4">
      <Image
        src={FOOTER_IMAGES.localName}
        alt="VHA partners"
        width={180}
        height={19}
        style={{
          filter: imageFilter,
        }}
      />
      <div className="grid lg:grid-cols-6 grid-cols-3 gap-2">
        {FOOTER_ITEMS.map(({ src, alt }, index) => (
          <div
            key={src}
            className={cn(
              'w-auto md:w-[124px] md:h-[60px] flex justify-center items-center',
              index % 2 === 0 ? 'bg-transparent' : 'bg-background-100',
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
