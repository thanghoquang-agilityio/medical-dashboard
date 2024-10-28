// Constants
import { SRC_BACKGROUND_AUTH } from '@/constants';

// Components
import { Image } from '@/components/ui/Image';
import { HeaderAuth } from '@/components/layouts/HeaderAuth';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative w-screen h-screen bg-default">
      <Image
        src={SRC_BACKGROUND_AUTH}
        alt="Background Auth"
        className="absolute z-10 w-full object-left h-full hidden sm:block"
        width={1600}
        height={960}
      />
      <HeaderAuth />
      <div className="container flex relative z-20 max-w-[1600px] w-full items-center m-auto justify-center 2xl:justify-end font-outfit h-[calc(100%-8rem)]">
        {children}
      </div>
    </main>
  );
}
