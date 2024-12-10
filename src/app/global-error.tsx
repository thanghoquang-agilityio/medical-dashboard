'use client';

import { ErrorFallback } from '@/components/errors';
import { ThemeProvider } from 'next-themes';
// Styles
import './globals.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="light">
        <body className="bg-background-100 h-[100vh] overflow-hidden">
          <ErrorFallback message={error.message} reset={reset} />;
        </body>
      </ThemeProvider>
    </html>
  );
}
