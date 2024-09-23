'use client';

import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

// Components
import { Button, Checkbox, Input, Text } from '@/components/ui';
import { EmailIcon, LockIcon } from '@/icons';

// Constants
import { LOGIN_FORM_VALIDATION, ROUTER } from '@/constants';

// Types
import { SignInForm } from '@/types';

const DEFAULT_VALUE: SignInForm = {
  identifier: '',
  password: '',
};
const LoginForm = () => {
  const {
    control,
    formState: { isValid, isDirty, isLoading },
    handleSubmit,
  } = useForm<SignInForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_VALUE,
  });

  // TODO: Implement login later
  const onSubmit: SubmitHandler<SignInForm> = (formData) => {
    formData;
  };

  return (
    <div className="w-full max-w-[528px] bg-background-100 flex flex-col justify-center items-center rounded-3xl py-6 lg:px-6 mx-2">
      <Text variant="quaternary" size="3xl">
        Login
      </Text>
      <form
        className="flex flex-col md:px-10 px-4 pt-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="identifier"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              size="lg"
              placeholder="email address"
              startContent={
                <EmailIcon customClass="w-6 h-6 text-primary-200" />
              }
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          )}
          rules={LOGIN_FORM_VALIDATION.EMAIL}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              size="lg"
              placeholder="password"
              type="password"
              startContent={<LockIcon customClass="w-6 h-6 text-primary-200" />}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          )}
          rules={LOGIN_FORM_VALIDATION.PASSWORD}
        />
        <div className="flex justify-between w-full px-2 pt-1 pb-8">
          <Checkbox isDisabled>Remember Me</Checkbox>
          <Link
            href={ROUTER.FORGOT_PASSWORD}
            className="font-semibold text-secondary-300"
          >
            Forgot Password?
          </Link>
        </div>
        <Button
          type="submit"
          size="lg"
          isDisabled={!isValid || !isDirty}
          isLoading={isLoading}
        >
          Login
        </Button>
        <div className="flex justify-center w-full gap-6 pt-10 pb-3">
          <Text>Don&rsquo;t Have An Account?</Text>
          <Link
            href={ROUTER.SIGNUP}
            className="font-semibold text-secondary-300"
          >
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
