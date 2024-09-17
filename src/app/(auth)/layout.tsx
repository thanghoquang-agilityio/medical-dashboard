import { Outfit } from 'next/font/google';
import type { Metadata } from 'next';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';

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

export const metadata: Metadata = {
  title: 'Medical Dashboard',
  description: 'Medical Dashboard application',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className}`}>
        <NextUIProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div>
              <Image
                src={SRC_BACKGROUND_AUTH}
                alt="Background Auth"
                className="absolute z-[-1] w-screen h-screen object-left"
                width={1600}
                height={960}
              />
            </div>
            <HeaderAuth />
            <main className="flex lg:justify-end lg:mr-[144px] justify-center height-auth py-[72px]">
              {children}
            </main>
          </ThemeProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
