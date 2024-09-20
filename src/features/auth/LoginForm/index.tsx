'use client';

import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

// Components
import { Button, Checkbox, Input, Text } from '@/components/ui';
import { EmailIcon, LockIcon } from '@/icons';

// Constants
import {
  LOGIN_FORM_VALIDATION,
  ROUTER,
  SOCIAL_NETWORK_LIST,
} from '@/constants';

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
    <div className="w-full max-w-[528px] bg-background-100 flex flex-col justify-center items-center rounded-3xl py-10 lg:px-10 mx-2">
      <Text variant="quaternary" size="3xl">
        Login
      </Text>
      <div className="flex gap-2 py-8">
        {SOCIAL_NETWORK_LIST.map(({ name, icon }) => (
          <Button key={name} size="lg" isIconOnly isDisabled>
            {icon}
          </Button>
        ))}
      </div>
      <Text size="sm" customClass="pt-2 pb-1">
        or
      </Text>
      <form
        className="flex flex-col px-1 w-full"
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
              className="py-2"
              startContent={
                <EmailIcon customClass="w-6 h-6 text-primary-200" />
              }
              isInvalid={!!error}
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
              className="py-2"
              startContent={<LockIcon customClass="w-6 h-6 text-primary-200" />}
              isInvalid={!!error}
              errorMessage={error?.message}
            />
          )}
          rules={LOGIN_FORM_VALIDATION.PASSWORD}
        />
        <div className="flex justify-between w-full px-2 pt-5 pb-8">
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
          <Text size="sm">Don&rsquo;t Have An Account?</Text>
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
