import type { Metadata } from 'next';
import { Inter, Poppins, Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';
import { SRC_LOGO } from '@/constants';

// Contexts
import ToastProvider from '@/context/toast';

// Styles
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
});

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Medical Dashboard',
  description: 'Medical Dashboard application',
  icons: [
    {
      rel: 'icon',
      url: SRC_LOGO,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} ${plusJakartaSans.variable} ${inter.variable} ${outfit.variable} bg-background-100`}
      >
        <NextUIProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
