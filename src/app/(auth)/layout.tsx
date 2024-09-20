import { Outfit } from 'next/font/google';

// Constants
import { SRC_BACKGROUND_AUTH } from '@/constants';

// Components
import { Image } from '@/components/ui/Image';
import { HeaderAuth } from '@/components/layouts/HeaderAuth';

// Styles
import '../globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`${outfit.className} w-screen h-screen`}>
      <Image
        src={SRC_BACKGROUND_AUTH}
        alt="Background Auth"
        className="absolute z-10 w-screen h-screen object-left"
        width={1600}
        height={960}
      />
      <div className="absolute z-20 w-screen h-screen">
        <HeaderAuth />
        <div className="flex lg:justify-end lg:mr-[144px] justify-center wrapper-auth py-[72px]">
          {children}
        </div>
      </div>
    </main>
  );
}
