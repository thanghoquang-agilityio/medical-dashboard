import type { Metadata } from 'next';
import { Inter, Poppins, Plus_Jakarta_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} ${plusJakartaSans.variable} ${inter.variable} bg-background-400`}
      >
        <NextUIProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
          </ThemeProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
