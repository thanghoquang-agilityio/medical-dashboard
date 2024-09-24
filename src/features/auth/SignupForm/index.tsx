'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link as NextUILink } from '@nextui-org/react';
import { useCallback, useState } from 'react';
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
import {
  FORM_VALIDATION_MESSAGE,
  REGEX,
  AUTH_ROUTES,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '@/constants';
import { LOGIN_FORM_VALIDATION } from '../LoginForm/rule';

// Types
import { SignupFormData, STATUS_TYPE } from '@/types';

// Utils
import { clearErrorOnChange } from '@/utils';

// Actions
import { signUp } from '@/actions/auth';

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
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_VALUE,
  });

  const iconClass = 'w-6 h-6 ml-4 text-primary-200';

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isPending, setIsPending] = useState(false);
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

  const onSubmit: SubmitHandler<SignupFormData> = async (formData) => {
    setIsPending(true);
    const { confirmPassWord: _, ...signUpData } = formData;

    try {
      const response = await signUp(signUpData);

      if (response.user) {
        showToast(SUCCESS_MESSAGE.SIGNUP, STATUS_TYPE.SUCCESS);

        router.replace(`${AUTH_ROUTES.LOGIN}`);
      }
    } catch (error) {
      showToast(ERROR_MESSAGE.SIGNUP, STATUS_TYPE.ERROR);
    }

    setIsPending(false);
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

  const handleInputChange = (
    name: keyof SignupFormData,
    onChange: (value: string) => void,
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);

      // Clear error message on change
      clearErrorOnChange(name, errors, clearErrors);
    };
  };

  return (
    <div className="w-full max-w-[528px] bg-background-100 flex flex-col justify-center items-center rounded-3xl py-6 lg:px-6 mx-2">
      <Text variant="quaternary" size="3xl">
        Signup
      </Text>
      <form
        className="flex flex-col md:px-10 px-4 pt-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
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
              size="lg"
              placeholder="user name"
              startContent={<DoctorIcon customClass={iconClass} />}
              isInvalid={!!error?.message}
              isDisabled={isLoading || isPending}
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
              size="lg"
              placeholder="email address"
              startContent={<EmailIcon customClass={iconClass} />}
              isInvalid={!!error?.message}
              isDisabled={isLoading || isPending}
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
              isDisabled={isLoading || isPending}
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
              isDisabled={isLoading || isPending}
              errorMessage={error?.message}
              onChange={handleInputChange(name, onChange)}
            />
          )}
          rules={SIGN_UP_FORM_VALIDATION.CONFIRM_PASSWORD}
        />

        <Button
          type="submit"
          size="lg"
          isDisabled={!isValid || !isDirty}
          isLoading={isLoading || isPending}
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
            isDisabled={isLoading || isPending}
          >
            Login
          </NextUILink>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
