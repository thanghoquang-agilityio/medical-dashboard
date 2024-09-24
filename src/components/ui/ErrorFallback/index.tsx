import Link from 'next/link';

// Constants
import { ERROR_IMAGE, PRIVATE_ROUTES } from '@/constants';

// Components
import { Image } from '../Image';

export type ErrorFallbackProps = {
  message?: string;
  reset?: () => void;
};

export const ErrorFallback = ({ message = '', reset }: ErrorFallbackProps) => {
  return (
    <div className="flex flex-col items-center gap-6 max-w-xs sm:max-w-full">
      <Image src={ERROR_IMAGE} alt="" width={160} height={160} />
      <h4 className="text-foreground text-2xl text-center">
        Oops! There is something wrong
      </h4>
      <p className="text-foreground-100 text-lg text-center">
        An error occurred. For more help, feel free to reach out to our support
        team.
      </p>

      {message && (
        <p className="text-foreground-100 text-md text-center whitespace-pre-line">
          Detail error:
          <br />
          <span className="text-danger">{message}</span>
        </p>
      )}

      <p className="text-foreground text-lg text-center">
        Please{' '}
        <span
          onClick={reset}
          className="text-sky hover:underline cursor-pointer"
        >
          reset the page
        </span>{' '}
        or{' '}
        <Link
          href={PRIVATE_ROUTES.DASHBOARD}
          className="text-sky hover:underline"
        >
          back to home
        </Link>
      </p>
    </div>
  );
};
