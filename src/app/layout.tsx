import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Poppins } from 'next/font/google';

// Components
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
      <body className={`${poppins.className} ${plusJakartaSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
