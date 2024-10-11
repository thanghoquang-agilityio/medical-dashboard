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
    <main className="relative w-screen h-screen min-h-[1000px] bg-default">
      <Image
        src={SRC_BACKGROUND_AUTH}
        alt="Background Auth"
        className="absolute z-10 w-full object-left h-full hidden sm:block"
        width={1600}
        height={960}
      />
      <div className="container flex flex-col relative z-20 w-full h-full max-w-[1600px] m-auto">
        <HeaderAuth />
        <div className="flex 2xl:justify-end mt-10 lg:m-auto w-full 2xl:flex-none  items-center justify-center font-outfit">
          {children}
        </div>
      </div>
    </main>
  );
}
