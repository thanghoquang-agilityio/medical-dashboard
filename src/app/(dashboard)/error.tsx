'use client';

// Components
import { ErrorFallback } from '@/components/errors';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorFallback message={error.message} reset={reset} />;
}
