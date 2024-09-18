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
    <main className={`${outfit.className}`}>
      <Image
        src={SRC_BACKGROUND_AUTH}
        alt="Background Auth"
        className="absolute z-[-1] w-screen h-screen object-left"
        width={1600}
        height={960}
      />
      <HeaderAuth />
      <div className="flex lg:justify-end lg:mr-[144px] justify-center height-auth py-[72px]">
        {children}
      </div>
    </main>
  );
}
