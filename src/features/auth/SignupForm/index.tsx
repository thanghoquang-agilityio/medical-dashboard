'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Card, Link as NextUILink } from '@nextui-org/react';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
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
  AUTH_ROUTES,
  DEFAULT_REGISTER_SPECIALTY_ID,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '@/constants';
import { SIGN_UP_FORM_VALIDATION } from './rule';

// Types
import { SignupFormData, STATUS_TYPE } from '@/types';

// Utils
import { clearErrorOnChange, isEnableSubmit } from '@/utils';

// Actions
import { addUserToChemists, signup } from '@/actions/auth';

// Contexts
import { useToast } from '@/context/toast';
import { updatePublishUser } from '@/services';

const DEFAULT_VALUE: SignupFormData = {
  username: '',
  email: '',
  password: '',
  confirmPassWord: '',
  // Default specialty is: Organic Chemist
  specialtyId: DEFAULT_REGISTER_SPECIALTY_ID,
};

const SignupForm = () => {
  const {
    control,
    getValues,
    formState: { isLoading, errors, dirtyFields },
    clearErrors,
    setError: setFormError,
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

  const openToast = useToast();
  const router = useRouter();

  const handleToggleVisiblePassword = useCallback(
    () => setIsShowPassword((prev) => !prev),
    [],
  );

  const handleToggleShowConfirmPassword = useCallback(
    () => setIsShowConfirmPassword((prev) => !prev),
    [],
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

  const handleError = useCallback(
    (error: string) => {
      openToast({
        message: error || ERROR_MESSAGE.SIGNUP,
        type: STATUS_TYPE.ERROR,
      });
      setIsPending(false);
      return;
    },
    [openToast],
  );

  const handleSignup: SubmitHandler<SignupFormData> = useCallback(
    async (formData) => {
      setIsPending(true);

      const { confirmPassWord: _, ...signupData } = formData;
      const { user, error } = await signup(signupData);

      if (error) {
        handleError(error);
        return;
      }

      if (user) {
        const { id } = user;

        const updateUserError = await updatePublishUser(id);
        if (updateUserError.error) {
          handleError(updateUserError.error);
          return;
        }

        const addUserError = await addUserToChemists({
          users_permissions_user: id,
        });

        if (addUserError.error) {
          handleError(addUserError.error);
          return;
        }

        openToast({
          message: SUCCESS_MESSAGE.SIGNUP,
          type: STATUS_TYPE.SUCCESS,
        });

        router.replace(`${AUTH_ROUTES.LOGIN}`);
      }
    },
    [handleError, openToast, router],
  );

  const iconClass = 'w-6 h-6 ml-4 text-primary-200';

  const isFetching = useMemo(
    () => isLoading || isPending,
    [isLoading, isPending],
  );

  const dirtyFieldList = Object.keys(dirtyFields);

  const isDisabled = useMemo(() => {
    const REQUIRED_FIELDS: Array<keyof SignupFormData> = [
      'username',
      'email',
      'password',
      'confirmPassWord',
    ];
    return !isEnableSubmit(REQUIRED_FIELDS, dirtyFieldList, errors);
  }, [dirtyFieldList, errors]);

  return (
    <Card className="w-full max-w-[528px] bg-background-100 flex flex-col justify-center items-center rounded-3xl py-6 lg:px-6 mx-2">
      <Text variant="tertiary" size="4xl" customClass="font-semibold">
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
              isDisabled={isFetching}
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
              isDisabled={isFetching}
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
          rules={SIGN_UP_FORM_VALIDATION.PASSWORD(
            getValues,
            setFormError,
            clearErrors,
          )}
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
                  aria-label="visible confirm password"
                  onClick={handleToggleShowConfirmPassword}
                  isIconOnly
                  className="p-0 min-w-5 h-5 text-primary-200"
                >
                  {isShowConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
                </Button>
              }
              isInvalid={!!error?.message}
              isDisabled={isFetching}
              errorMessage={error?.message}
              onChange={handleInputChange(name, onChange)}
            />
          )}
          rules={SIGN_UP_FORM_VALIDATION.CONFIRM_PASSWORD(getValues)}
        />
        <div className="h-[78px] flex flex-col justify-end">
          <Button
            type="submit"
            size="lg"
            isDisabled={isDisabled}
            isLoading={isFetching}
          >
            Signup
          </Button>
        </div>
        <div className="flex justify-center w-full gap-6 pt-10 pb-3">
          <Text>Already have account?</Text>
          <NextUILink
            as={Link}
            href={AUTH_ROUTES.LOGIN}
            className="font-semibold text-secondary-400"
            isDisabled={isFetching}
          >
            Login
          </NextUILink>
        </div>
      </form>
    </Card>
  );
};

export default SignupForm;
