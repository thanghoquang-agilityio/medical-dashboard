'use client';

import { Textarea, useDisclosure } from '@nextui-org/react';
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

// Components
import { Button, ImageUpload, Input, Select, Text } from '@/components/ui';
import { EyeIcon, EyeSlashIcon, NoteIcon, StarIcon } from '@/icons';

// Types
import {
  UserModel,
  ChemistFormData,
  UserPayload,
  RolePermission,
  ROLE,
  STATUS_TYPE,
  Option,
} from '@/types';

// Utils
import { clearErrorOnChange, getRoleIdByName } from '@/utils';

// Rules
import { CHEMIST_FORM_VALIDATION } from './rule';
import { addUser, getUserRoles, updateUser, uploadImage } from '@/services';
import { addUserToChemists } from '@/actions/auth';
import { useToast } from '@/context/toast';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '@/constants';

export type ChemistFormProps = {
  specialtyOptions: Option[];
  id?: string;
  data?: UserModel;
  onClose?: () => void;
  specialtyId?: string;
};

const ChemistForm = memo(
  ({ id, data, specialtyOptions, specialtyId, onClose }: ChemistFormProps) => {
    const {
      username = '',
      email = '',
      password = '',
      avatar = '',
      description = '',
      rating = 0,
      tasks = 0,
      reviews = 0,
    } = data || {};

    const { onOpen } = useDisclosure();
    const [imageUpload, setImageUpload] = useState<string | undefined>(
      undefined,
    );
    const [formImage, setFormImage] = useState<FormData | undefined>(undefined);
    const [imageRemote, setImageRemote] = useState<string | undefined>(
      avatar.toString(),
    );
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] =
      useState<boolean>(false);
    const [roles, getRoles] = useState<RolePermission[]>([]);
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const openToast = useToast();

    const {
      control,
      handleSubmit,
      setValue,
      getValues,
      clearErrors,
      setError: setFormError,
      formState: { errors, isValid, isLoading },
    } = useForm<ChemistFormData>({
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      defaultValues: {
        avatar: avatar.toString(),
        username,
        password,
        confirmPassWord: password,
        email,
        description,
        specialtyId,
      },
    });

    useEffect(() => {
      const fetchUserRoles = async () => {
        const { roles, error } = await getUserRoles();
        if (error) throw error;
        getRoles(roles);
      };

      fetchUserRoles();
    }, []);

    const isEdit = !!data;

    const handleToggleVisiblePassword = useCallback(
      () => setIsShowPassword((prev) => !prev),
      [],
    );

    const handleToggleShowConfirmPassword = useCallback(
      () => setIsShowConfirmPassword((prev) => !prev),
      [],
    );
    // Handle input changes
    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files[0]) {
        const image = files[0];
        const formData = new FormData();
        formData.append('files', image);

        setFormImage(formData);
        setImageUpload(URL.createObjectURL(image));
        setValue('avatar', URL.createObjectURL(image));
      }
    };

    // Handle remove upload image
    const handleRemoveImage = () => {
      setImageUpload('');
      setFormImage(undefined);
      setValue('avatar', '');
      setImageRemote('');

      if (hiddenFileInput.current) {
        hiddenFileInput.current.value = '';
      }
    };

    const handleInputChange = useCallback(
      (name: keyof ChemistFormData, onChange: (value: string) => void) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);

          // Clear error message on change
          clearErrorOnChange(name, errors, clearErrors);
        };
      },
      [clearErrors, errors],
    );

    const handleClick = () => {
      hiddenFileInput.current?.click();
    };

    // Handle submit form data to create chemist
    const handleSubmitForm: SubmitHandler<ChemistFormData> = useCallback(
      async (formData) => {
        setError('');
        setIsPending(true);

        const { username, email, password, specialtyId, description } =
          formData;

        const avatar = formImage ? await uploadImage(formImage) : undefined;

        const payload: UserPayload = {
          username,
          email,
          password,
          description,
          avatar: Number(avatar?.image?.[0]?.id),
          specialtyId: Number(specialtyId),
          role: Number(getRoleIdByName(roles, ROLE.NORMAL_USER)),
        };

        if (isEdit) {
          const { error } = await updateUser(String(id), payload);

          if (error) {
            setError(error);
            openToast({
              message: ERROR_MESSAGE.UPDATE('chemist'),
              type: STATUS_TYPE.ERROR,
            });
            setIsPending(false);
            return;
          }
        } else {
          const { user, error } = await addUser(payload);

          if (error) {
            setError(error);
            openToast({
              message: ERROR_MESSAGE.CREATE('chemist'),
              type: STATUS_TYPE.ERROR,
            });
            setIsPending(false);
            return;
          }

          if (user) {
            const { id } = user;
            const { error } = await addUserToChemists({
              users_permissions_user: String(id),
            });

            if (error) {
              setError(error);
              openToast({
                message: ERROR_MESSAGE.CREATE('chemist'),
                type: STATUS_TYPE.ERROR,
              });
              setIsPending(false);
              return;
            }

            openToast({
              message: isEdit
                ? SUCCESS_MESSAGE.UPDATE('chemist')
                : SUCCESS_MESSAGE.CREATE('chemist'),
              type: STATUS_TYPE.SUCCESS,
            });
          }
        }

        setIsPending(false);
        onClose?.();
      },
      [id, isEdit, formImage, roles, onClose, openToast],
    );

    return (
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="p-4 flex flex-col"
      >
        <Text variant="title" size="xl">
          {isEdit ? 'Update chemist' : 'Create chemist'}
        </Text>

        {/* Avatar */}
        <Controller
          control={control}
          name="avatar"
          render={({ field }) => (
            <ImageUpload
              {...field}
              ref={hiddenFileInput}
              src={imageRemote}
              srcUpload={imageUpload}
              onRemoveImage={handleRemoveImage}
              onUploadImage={handleUpload}
              onClick={handleClick}
            />
          )}
        />

        {/* Info section */}
        {isEdit && (
          <div className="flex justify-between self-center gap-6 mt-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <NoteIcon customClass="w-6 h-6" />
              <Text size="sm" variant="title" customClass="font-medium">
                {tasks} Tasks
              </Text>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <StarIcon customClass="w-6 h-6 text-light-orange" />
              <Text size="sm" variant="title" customClass="font-medium">
                {rating} ({reviews} Reviews)
              </Text>
            </div>
          </div>
        )}

        {/* Username */}
        <Controller
          name="username"
          control={control}
          render={({ field: { name, ...rest }, fieldState: { error } }) => (
            <Input
              {...rest}
              isRequired
              label="Username"
              labelPlacement="outside"
              name={name}
              placeholder="Please enter username"
              type="text"
              size="sm"
              isDisabled={isLoading}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          )}
          rules={CHEMIST_FORM_VALIDATION.USERNAME}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field: { name, ...rest }, fieldState: { error } }) => (
            <Input
              {...rest}
              label="Email"
              isRequired
              labelPlacement="outside"
              name={name}
              placeholder="Please enter email"
              type="text"
              size="sm"
              isDisabled={isLoading}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          )}
          rules={CHEMIST_FORM_VALIDATION.EMAIL}
        />

        {/* Password */}
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
              label="Password"
              labelPlacement="outside"
              size="sm"
              type={isShowPassword ? 'text' : 'password'}
              placeholder="Please enter password"
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
              isDisabled={isLoading || isEdit}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              onChange={handleInputChange(name, onChange)}
            />
          )}
          rules={CHEMIST_FORM_VALIDATION.PASSWORD(
            getValues,
            setFormError,
            clearErrors,
            isEdit,
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="confirmPassWord"
          control={control}
          render={({
            field: { onChange, name, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              size="sm"
              label="Confirm Password"
              labelPlacement="outside"
              type={isShowConfirmPassword ? 'text' : 'password'}
              placeholder="Please enter confirm password"
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
              isDisabled={isLoading || isEdit}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              onChange={handleInputChange(name, onChange)}
            />
          )}
          rules={CHEMIST_FORM_VALIDATION.CONFIRM_PASSWORD(getValues, isEdit)}
        />

        {/* Specialty */}
        <Controller
          control={control}
          name="specialtyId"
          render={({
            field: { name, value, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Select
              {...rest}
              name={name}
              value={value}
              label="Specialty"
              placeholder="Select specialty"
              labelPlacement="outside"
              variant="bordered"
              classNames={{
                mainWrapper: 'h-16',
                trigger: 'h-[auto] py-3 max-h-10',
                errorMessage: 'text-danger text-xs ml-2',
                label: 'top-5 text-sm text-foreground',
                value: 'text-sm text-primary-100',
              }}
              isDisabled={isLoading}
              defaultSelectedKeys={value}
              options={specialtyOptions}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              onChange={onChange}
            />
          )}
          rules={CHEMIST_FORM_VALIDATION.SPECIALTY}
        />

        {/* Description */}
        <Controller
          name="description"
          control={control}
          render={({
            field: { name, value, ...rest },
            fieldState: { error },
          }) => (
            <Textarea
              {...rest}
              label="Description"
              labelPlacement="outside"
              name={name}
              value={value}
              size="sm"
              classNames={{
                inputWrapper: 'border-primary-100 border-[1px]',
                errorMessage: 'text-danger text-xs ml-2',
                label: 'text-sm',
              }}
              isDisabled={isLoading}
              placeholder="Please enter description"
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          )}
          rules={CHEMIST_FORM_VALIDATION.DESCRIPTION}
        />

        <div className="h-[78px] flex flex-col justify-end">
          {error && (
            <Text variant="error" size="sm" customClass="py-2">
              {error}
            </Text>
          )}
          <div className="w-full gap-2 flex justify-end">
            <Button
              onClick={onOpen}
              variant="outline"
              color="outline"
              className="font-medium"
            >
              Cancel
            </Button>
            <Button
              isDisabled={!isValid}
              isLoading={isLoading || isPending}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    );
  },
);

export default ChemistForm;
ChemistForm.displayName = 'ChemistForm';
