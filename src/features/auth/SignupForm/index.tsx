'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link as NextUILink } from '@nextui-org/react';
import { ChangeEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Components
import { Button, Input, Text } from '@/components/ui';
import {
  DoctorIcon,
  EmailIcon,
  EyeIcon,
  EyeSlashIcon,
  LockIcon,
} from '@/icons';

// Constants
import { AUTH_ROUTES, ERROR_MESSAGE, SUCCESS_MESSAGE } from '@/constants';
import { SIGN_UP_FORM_VALIDATION } from './rule';

// Types
import { SignupFormData, STATUS_TYPE } from '@/types';

// Utils
import { clearErrorOnChange } from '@/utils';

// Actions
import { signup } from '@/actions/auth';

// Hooks
import { useToast } from '@/hooks';

const DEFAULT_VALUE: SignupFormData = {
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
  } = useForm<SignupFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_VALUE,
  });

  const [isPending, setIsPending] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);

  const { showToast } = useToast();

  const router = useRouter();

  const handleToggleVisiblePassword = useCallback(
    () => setIsShowPassword((prev) => !prev),
    [],
  );

  const handleToggleShowConfirmPassword = useCallback(
    () => setIsShowConfirmPassword((prev) => !prev),
    [],
  );

  const handleSignup: SubmitHandler<SignupFormData> = useCallback(
    async (formData) => {
      setIsPending(true);
      const { confirmPassWord: _, ...signupData } = formData;

      try {
        const response = await signup(signupData);

        if (response.user) {
          showToast(SUCCESS_MESSAGE.SIGNUP, STATUS_TYPE.SUCCESS);

          router.replace(`${AUTH_ROUTES.LOGIN}`);
        }
      } catch (error) {
        showToast(ERROR_MESSAGE.SIGNUP, STATUS_TYPE.ERROR);
      }

      setIsPending(false);
    },
    [router, showToast],
  );

  const handleInputChange = useCallback(
    (name: keyof SignupFormData, onChange: (value: string) => void) => {
      return (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);

        // Clear error message on change
        clearErrorOnChange(name, errors, clearErrors);
      };
    },
    [clearErrors, errors],
  );

  const iconClass = 'w-6 h-6 ml-4 text-primary-200';
  const isDisabled = isLoading || isPending;

  return (
    <div className="w-full max-w-[528px] bg-background-100 flex flex-col justify-center items-center rounded-3xl py-6 lg:px-6 mx-2">
      <Text variant="quaternary" size="3xl">
        Signup
      </Text>
      <form
        className="flex flex-col md:px-10 px-4 pt-4 w-full"
        onSubmit={handleSubmit(handleSignup)}
      >
        <Controller
          name="username"
          control={control}
          render={({
            field: { onChange, name, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              name={name}
              size="lg"
              placeholder="user name"
              startContent={<DoctorIcon customClass={iconClass} />}
              isInvalid={!!error?.message}
              isDisabled={isDisabled}
              errorMessage={error?.message}
              onChange={handleInputChange(name, onChange)}
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
              name={name}
              size="lg"
              placeholder="email address"
              startContent={<EmailIcon customClass={iconClass} />}
              isInvalid={!!error?.message}
              isDisabled={isDisabled}
              errorMessage={error?.message}
              onChange={handleInputChange(name, onChange)}
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
              name={name}
              size="lg"
              type={isShowPassword ? 'text' : 'password'}
              placeholder="password"
              startContent={<LockIcon customClass={iconClass} />}
              endContent={
                <Button
                  onClick={handleToggleVisiblePassword}
                  isIconOnly
                  className="p-0 min-w-5 h-5 text-primary-200"
                >
                  {isShowPassword ? <EyeIcon /> : <EyeSlashIcon />}
                </Button>
              }
              isInvalid={!!error?.message}
              isDisabled={isDisabled}
              errorMessage={error?.message}
              onChange={handleInputChange(name, onChange)}
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
              type={isShowConfirmPassword ? 'text' : 'password'}
              placeholder="confirm password"
              startContent={<LockIcon customClass={iconClass} />}
              endContent={
                <Button
                  onClick={handleToggleShowConfirmPassword}
                  isIconOnly
                  className="p-0 min-w-5 h-5 text-primary-200"
                >
                  {isShowConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
                </Button>
              }
              isInvalid={!!error?.message}
              isDisabled={isDisabled}
              errorMessage={error?.message}
              onChange={handleInputChange(name, onChange)}
            />
          )}
          rules={SIGN_UP_FORM_VALIDATION.CONFIRM_PASSWORD(getValues)}
        />

        <Button
          type="submit"
          size="lg"
          isDisabled={!isValid || !isDirty}
          isLoading={isDisabled}
          className="mt-4"
        >
          Signup
        </Button>
        <div className="flex justify-center w-full gap-6 pt-10 pb-3">
          <Text>Already have account?</Text>
          <NextUILink
            as={Link}
            href={AUTH_ROUTES.LOGIN}
            className="font-semibold text-secondary-300"
            isDisabled={isDisabled}
          >
            Login
          </NextUILink>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
