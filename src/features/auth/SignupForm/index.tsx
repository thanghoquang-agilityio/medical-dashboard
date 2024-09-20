'use client';

import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

// Components
import { Button, Input, Text } from '@/components/ui';
import { DoctorIcon, EmailIcon, LockIcon } from '@/icons';

// Constants
import {
  FORM_VALIDATION_MESSAGE,
  LOGIN_FORM_VALIDATION,
  REGEX,
  ROUTER,
} from '@/constants';

// Types
import { SignUpForm } from '@/types';

// Utils
import { clearErrorOnChange } from '@/utils';

const DEFAULT_VALUE: SignUpForm = {
  username: '',
  email: '',
  password: '',
  confirmPassWord: '',
};

const SignupForm = () => {
  const {
    control,
    getValues,
    formState: { isValid, isDirty, isLoading, errors },
    clearErrors,
    handleSubmit,
  } = useForm<SignUpForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_VALUE,
  });

  const iconClass = 'w-6 h-6 ml-4 text-primary-200';

  // TODO: will handle submit form later
  const onSubmit: SubmitHandler<SignUpForm> = (formData) => {
    formData;
  };

  const SIGN_UP_FORM_VALIDATION = {
    ...LOGIN_FORM_VALIDATION,
    USERNAME: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Name'),
      pattern: {
        value: REGEX.NAME,
        message: FORM_VALIDATION_MESSAGE.FORMAT('Name'),
      },
    },
    CONFIRM_PASSWORD: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Confirm Password'),
      validate: {
        matchesPassword: (value: string) =>
          value === getValues('password') ||
          FORM_VALIDATION_MESSAGE.PASSWORD_NOT_MATCH,
      },
    },
  };

  return (
    <div className="max-w-[528px] rounded-3xl shadow-lg flex flex-col items-center">
      <Text customClass="font-bold text-secondary-300 text-3xl">Signup</Text>
      <form
        className="w-full px-5 md:px-10 lg:px-[72px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-8 flex flex-col gap-4 items-center">
          <Controller
            name="username"
            control={control}
            render={({
              field: { onChange, name, ...rest },
              fieldState: { error },
            }) => (
              <Input
                {...rest}
                size="lg"
                placeholder="user name"
                startContent={<DoctorIcon customClass={iconClass} />}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                onChange={(e) => {
                  onChange(e.target.value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                }}
              />
            )}
            rules={SIGN_UP_FORM_VALIDATION.USERNAME}
          />
          <Controller
            name="email"
            control={control}
            render={({
              field: { onChange, name, ...rest },
              fieldState: { error },
            }) => (
              <Input
                {...rest}
                size="lg"
                placeholder="email address"
                startContent={<EmailIcon customClass={iconClass} />}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                onChange={(e) => {
                  onChange(e.target.value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                }}
              />
            )}
            rules={SIGN_UP_FORM_VALIDATION.EMAIL}
          />

          <Controller
            name="password"
            control={control}
            render={({
              field: { onChange, name, ...rest },
              fieldState: { error },
            }) => (
              <Input
                {...rest}
                size="lg"
                type="password"
                placeholder="password"
                startContent={<LockIcon customClass={iconClass} />}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                onChange={(e) => {
                  onChange(e.target.value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                }}
              />
            )}
            rules={SIGN_UP_FORM_VALIDATION.PASSWORD}
          />

          <Controller
            name="confirmPassWord"
            control={control}
            render={({
              field: { onChange, name, ...rest },
              fieldState: { error },
            }) => (
              <Input
                {...rest}
                size="lg"
                type="password"
                placeholder="confirm password"
                startContent={<LockIcon customClass={iconClass} />}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                onChange={(e) => {
                  onChange(e.target.value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                }}
              />
            )}
            rules={SIGN_UP_FORM_VALIDATION.CONFIRM_PASSWORD}
          />

          <Button
            type="submit"
            isDisabled={!isValid || !isDirty}
            isLoading={isLoading}
            className="w-full py-2 text-lg"
          >
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

export default SignupForm;
