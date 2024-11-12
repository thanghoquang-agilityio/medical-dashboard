import Link from 'next/link';

// Constants
import { NOT_FOUND_URL_IMAGE, PRIVATE_ROUTES } from '@/constants';

// Components
import { Image } from '@/components/ui';

export type NotFoundFallbackProps = {
  title?: string;
  message?: string;
  reset?: () => void;
};

export const NotFoundFallback = ({
  title = 'Page not found',
  message = '',
  reset,
}: NotFoundFallbackProps) => (
  <div className="flex flex-col h-full gap-4 items-center justify-center">
    <Image src={NOT_FOUND_URL_IMAGE} alt="" width={160} height={160} />
    <h2 className="text-2xl">404 - {title}</h2>
    {message && (
      <p className="text-foreground-100 text-lg text-center">{message}</p>
    )}
    <p className="text-foreground text-lg text-center">
      Please&nbsp;
      <span
        onClick={reset}
        className="text-secondary-100 hover:underline cursor-pointer"
      >
        reset the page&nbsp;
      </span>
      or&nbsp;
      <Link
        href={PRIVATE_ROUTES.DASHBOARD}
        className="text-secondary-100 hover:underline"
      >
        back to home
      </Link>
    </p>
  </div>
);
