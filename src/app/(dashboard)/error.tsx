'use client';

// Components
import { ErrorFallback } from '@/components/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex h-[40vh] lg:h-[70vh] items-center justify-center">
      <ErrorFallback message={error.message} reset={reset} />
    </main>
  );
}
