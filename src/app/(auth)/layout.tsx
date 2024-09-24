import { Outfit } from 'next/font/google';

// Constants
import { SRC_BACKGROUND_AUTH } from '@/constants';

// Components
import { Image } from '@/components/ui/Image';
import { HeaderAuth } from '@/components/layouts/HeaderAuth';

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
    <main
      className={`${outfit.className} w-screen h-screen min-h-fit bg-black`}
    >
      <div className="relative max-w-[1600px] m-auto">
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
      </div>
    </main>
  );
}
