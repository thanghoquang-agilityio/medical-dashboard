'use client';

import { Controller, useForm } from 'react-hook-form';
import { Card, Link as NextUILink } from '@nextui-org/react';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import Link from 'next/link';

// Components
import { Button, Checkbox, Input, Text } from '@/components/ui';
import { EmailIcon, EyeIcon, EyeSlashIcon, LockIcon } from '@/icons';

// Constants
import { AUTH_ROUTES, ERROR_MESSAGE, SUCCESS_MESSAGE } from '@/constants';
import { LOGIN_FORM_VALIDATION } from './rule';

// Types
import { LoginFormData, STATUS_TYPE } from '@/types';

// Utils
import { clearErrorOnChange, isEnableSubmit } from '@/utils';

// Contexts
import { useToast } from '@/context/toast';
import { fetchToken } from '@/config/firebase.config';
import { login, loginNextAuth } from '@/actions/auth';

const DEFAULT_VALUE: LoginFormData = {
  identifier: '',
  password: '',
  remember: false,
};

const LoginForm = () => {
  const {
    control,
    formState: { isLoading, errors, dirtyFields },
    handleSubmit,
    clearErrors,
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_VALUE,
  });

  const [isPending, setIsPending] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const openToast = useToast();

  const handleToggleVisiblePassword = useCallback(
    () => setIsShowPassword((prev) => !prev),
    [],
  );

  const handleInputChange = useCallback(
    (name: keyof LoginFormData, onChange: (value: string) => void) => {
      return (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);

        clearErrorOnChange(name, errors, clearErrors);
      };
    },
    [clearErrors, errors],
  );

  const handleLogin = useCallback(
    async (data: LoginFormData) => {
      setIsPending(true);

      const { user, error } = await login(data);

      if (user) {
        const firebaseToken = await fetchToken();

        const cookiePayload = {
          key: 'fcm_token',
          value: firebaseToken,
        };

        await fetch('/api/save-to-cookie', {
          body: JSON.stringify(cookiePayload),
          method: 'POST',
        });

        openToast({
          message: SUCCESS_MESSAGE.LOGIN,
          type: STATUS_TYPE.SUCCESS,
        });

        loginNextAuth(user);
      }

      if (error) {
        openToast({
          message:
            error.replace('identifier', 'username') || ERROR_MESSAGE.LOGIN,
          type: STATUS_TYPE.ERROR,
        });

        setIsPending(false);
      }
    },
    [openToast],
  );

  const iconClass = 'w-6 h-6 ml-4 text-primary-200';

  const isFetching = useMemo(
    () => isLoading || isPending,
    [isLoading, isPending],
  );

  const dirtyFieldList = Object.keys(dirtyFields);

  const isDisabled = useMemo(() => {
    const REQUIRED_FIELDS: Array<keyof LoginFormData> = [
      'identifier',
      'password',
    ];
    return !isEnableSubmit(REQUIRED_FIELDS, dirtyFieldList, errors);
  }, [dirtyFieldList, errors]);

  return (
    <Card className="w-full max-w-[528px] max-h-[530px] bg-background-100 flex flex-col justify-center items-center rounded-3xl py-6 lg:px-6 mx-2">
      <Text variant="tertiary" size="4xl" customClass="font-semibold">
        Login
      </Text>
      <form
        className="flex flex-col md:px-10 px-4 pt-4 w-full"
        onSubmit={handleSubmit(handleLogin)}
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
              startContent={<EmailIcon customClass={iconClass} />}
              isInvalid={!!error?.message}
              isDisabled={isFetching}
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
              startContent={<LockIcon customClass={iconClass} />}
              endContent={
                <Button
                  aria-label="visible password"
                  onClick={handleToggleVisiblePassword}
                  isIconOnly
                  className="p-0 min-w-5 h-5 text-primary-200"
                >
                  {isShowPassword ? <EyeIcon /> : <EyeSlashIcon />}
                </Button>
              }
              isInvalid={!!error?.message}
              isDisabled={isFetching}
              errorMessage={error?.message}
              onChange={handleInputChange(name, onChange)}
            />
          )}
          rules={LOGIN_FORM_VALIDATION.PASSWORD}
        />
        <div className="flex justify-between w-full px-2 py-4">
          <Controller
            name="remember"
            control={control}
            render={({ field: { onChange } }) => (
              <Checkbox onChange={onChange} isDisabled={isFetching}>
                Remember Me
              </Checkbox>
            )}
          />
          <NextUILink
            as={Link}
            href={AUTH_ROUTES.FORGOT_PASSWORD}
            className="font-semibold text-secondary-400 text-lg"
            isDisabled={true}
          >
            Forgot Password?
          </NextUILink>
        </div>
        <div className="h-[78px] flex flex-col justify-end">
          <Button
            type="submit"
            size="lg"
            isDisabled={isDisabled || isFetching}
            isLoading={isFetching}
          >
            Login
          </Button>
        </div>
        <div className="flex justify-center w-full gap-6 pt-10 pb-3">
          <Text>Don&rsquo;t Have An Account?</Text>
          <NextUILink
            className="font-semibold text-secondary-400"
            as={Link}
            href={AUTH_ROUTES.SIGNUP}
            isDisabled={isFetching}
          >
            Signup
          </NextUILink>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
