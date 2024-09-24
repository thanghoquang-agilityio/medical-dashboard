'use client';

import { Controller, useForm } from 'react-hook-form';
import { Link as NextUILink } from '@nextui-org/react';
import { ChangeEvent, useCallback, useState } from 'react';
import Link from 'next/link';

// Actions
import { loginNextAuth, loginStrapi } from '@/actions/auth';

// Components
import { Button, Checkbox, Input, Text } from '@/components/ui';
import { EmailIcon, EyeIcon, EyeSlashIcon, LockIcon } from '@/icons';

// Constants
import { AUTH_ROUTES, ERROR_MESSAGE, SUCCESS_MESSAGE } from '@/constants';
import { LOGIN_FORM_VALIDATION } from './rule';

// Types
import { LoginFormData, STATUS_TYPE } from '@/types';

// Hooks
import { useToast } from '@/hooks';

// Utils
import { clearErrorOnChange } from '@/utils';

const DEFAULT_VALUE: LoginFormData = {
  identifier: '',
  password: '',
  remember: false,
};

const LoginForm = () => {
  const {
    control,
    formState: { isValid, isDirty, isLoading, errors },
    handleSubmit,
    clearErrors,
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_VALUE,
  });

  const [isPending, setIsPending] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const { showToast } = useToast();

  const handleToggleVisiblePassword = useCallback(
    () => setIsShowPassword((prev) => !prev),
    [],
  );

  const handleInputChange = (
    name: keyof LoginFormData,
    onChange: (value: string) => void,
  ) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);

      // Clear error message on change
      clearErrorOnChange(name, errors, clearErrors);
    };
  };

  const onLogin = useCallback(
    async (data: LoginFormData) => {
      setIsPending(true);
      try {
        const response = await loginStrapi(data);

        if (response) {
          showToast(SUCCESS_MESSAGE.LOGIN, STATUS_TYPE.SUCCESS);
          loginNextAuth(response);
        }
      } catch (error) {
        showToast(ERROR_MESSAGE.LOGIN, STATUS_TYPE.ERROR);
        setIsPending(false);
      }
    },
    [showToast],
  );

  return (
    <div className="w-full max-w-[528px] bg-background-100 flex flex-col justify-center items-center rounded-3xl py-6 lg:px-6 mx-2">
      <Text variant="quaternary" size="3xl">
        Login
      </Text>
      <form
        className="flex flex-col md:px-10 px-4 pt-4 w-full"
        onSubmit={handleSubmit(onLogin)}
      >
        <Controller
          name="identifier"
          control={control}
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              name={name}
              size="lg"
              placeholder="email address"
              startContent={
                <EmailIcon customClass="w-6 h-6 text-primary-200" />
              }
              isInvalid={!!error?.message}
              isDisabled={isLoading || isPending}
              errorMessage={error?.message}
              onChange={handleInputChange(name, onChange)}
            />
          )}
          rules={LOGIN_FORM_VALIDATION.EMAIL}
        />
        <Controller
          name="password"
          control={control}
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              name={name}
              size="lg"
              placeholder="password"
              type={isShowPassword ? 'text' : 'password'}
              startContent={<LockIcon customClass="w-6 h-6 text-primary-200" />}
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
          rules={LOGIN_FORM_VALIDATION.PASSWORD}
        />
        <div className="flex justify-between w-full px-2 pt-5 pb-8">
          <Controller
            name="remember"
            control={control}
            render={({ field: { onChange } }) => (
              <Checkbox onChange={onChange} isDisabled={isLoading || isPending}>
                Remember Me
              </Checkbox>
            )}
          />
          <NextUILink
            as={Link}
            href={AUTH_ROUTES.FORGOT_PASSWORD}
            className="font-semibold text-secondary-300"
            isDisabled={isLoading || isPending}
          >
            Forgot Password?
          </NextUILink>
        </div>
        <Button
          type="submit"
          size="lg"
          isDisabled={!isValid || !isDirty}
          isLoading={isLoading || isPending}
        >
          Login
        </Button>
        <div className="flex justify-center w-full gap-6 pt-10 pb-3">
          <Text>Don&rsquo;t Have An Account?</Text>
          <NextUILink
            className="font-semibold text-secondary-300"
            as={Link}
            href={AUTH_ROUTES.SIGNUP}
            isDisabled={isLoading || isPending}
          >
            Signup
          </NextUILink>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
