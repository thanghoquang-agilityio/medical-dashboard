// Constants
import { NotFoundFallback } from '@/components/errors';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col h-full gap-4 items-center justify-center">
      <NotFoundFallback />
    </main>
  );
}
