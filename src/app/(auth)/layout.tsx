import { Outfit } from 'next/font/google';

// Constants
import { SRC_BACKGROUND_AUTH } from '@/constants';

// Components
import { Image } from '@/components/ui/Image';
import { HeaderAuth } from '@/components/layouts/HeaderAuth';

// Styles
import './auth.css';

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
    <main className={`${outfit.className} relative h-screen min-h-fit`}>
      <Image
        src={SRC_BACKGROUND_AUTH}
        alt="Background Auth"
        className="absolute z-10 h-screen object-left min-h-[944px]"
        width={1600}
        height={960}
      />
      <div className="absolute z-20 w-full min-h-fit">
        <HeaderAuth />
        <div className="flex 2xl:justify-end 2xl:mr-[144px] justify-center wrapper-auth py-[72px]">
          {children}
        </div>
      </div>
    </main>
  );
}
