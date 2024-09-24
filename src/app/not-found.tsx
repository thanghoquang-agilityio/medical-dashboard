import Link from 'next/link';

// Components
import { Image } from '@/components/ui';

// Constants
import { PRIVATE_ROUTES } from '@/constants';

export default function NotFound() {
  return (
    <main>
      <div className="flex h-screen flex-col gap-4 items-center justify-center px-4 text-center">
        <Image src="/images/not-found.png" alt="" width={160} height={160} />
        <h2 className="text-2xl">404 - Page not found</h2>
        <p>
          Please check your URL again and refresh the page or{' '}
          <Link
            href={PRIVATE_ROUTES.DASHBOARD}
            className="text-sky hover:underline"
          >
            return to dashboard
          </Link>
        </p>
      </div>
    </main>
  );
}
