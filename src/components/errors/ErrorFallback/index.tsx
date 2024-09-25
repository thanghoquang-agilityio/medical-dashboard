import Link from 'next/link';

// Constants
import { ERROR_IMAGE, PRIVATE_ROUTES } from '@/constants';

// Components
import { Image } from '@/components/ui';

export type ErrorFallbackProps = {
  message?: string;
  reset?: () => void;
};

export const ErrorFallback = ({ message = '', reset }: ErrorFallbackProps) => (
  <div className="flex flex-col h-full gap-4 items-center justify-center">
    <Image src={ERROR_IMAGE} alt="" width={160} height={160} />
    <h2 className="text-foreground text-2xl text-center">
      Oops! There is something wrong
    </h2>
    <p className="text-foreground-100 text-lg text-center">
      An error occurred. For more help, feel free to reach out to our support
      team.
    </p>

    {message && (
      <p className="text-foreground-100 text-lg text-center whitespace-pre-line">
        Detail error:
        <br />
        <span className="text-danger-100">{message}</span>
      </p>
    )}

    <p className="text-foreground text-lg text-center">
      Please&nbsp;
      <span onClick={reset} className="text-sky hover:underline cursor-pointer">
        reset the page&nbsp;
      </span>
      or&nbsp;
      <Link
        href={PRIVATE_ROUTES.DASHBOARD}
        className="text-sky hover:underline"
      >
        back to home
      </Link>
    </p>
  </div>
);
