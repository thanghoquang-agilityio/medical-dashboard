'use client';

import Link from 'next/link';

// Components
import { Button, Input, Text } from '@/components/ui';
import { EmailIcon, LockIcon } from '@/icons';

// Constants
import { ROUTER } from '@/constants';

export const SignUpForm = () => {
  const iconClass = 'w-6 h-6 ml-4 text-primary-200';

  return (
    <div>
      <Text customClass="font-bold text-center text-secondary-300 text-3xl">
        Signup
      </Text>
      <form className="rounded-3xl shadow-lg px-[72px] py-10">
        <div className="mt-8 flex flex-col gap-4 items-center">
          <Input
            placeholder="email address"
            startContent={<EmailIcon customClass={iconClass} />}
          />
          <Input
            type="password"
            placeholder="password"
            startContent={<LockIcon customClass={iconClass} />}
          />

          <Input
            type="password"
            placeholder="confirm password"
            startContent={<LockIcon customClass={iconClass} />}
          />

          <Button type="submit" className="w-full py-2 text-lg">
            Signup
          </Button>
        </div>
        <div className="flex my-8 justify-center gap-3">
          <Text>Already have account?</Text>
          <Link
            href={ROUTER.LOGIN}
            className="font-semibold text-secondary-300"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
