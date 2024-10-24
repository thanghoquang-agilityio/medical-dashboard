'use client';

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
import { Textarea } from '@nextui-org/react';

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
import { AVATAR_THUMBNAIL, ERROR_MESSAGE, SUCCESS_MESSAGE } from '@/constants';

// Helper
import { clearErrorOnChange, getRoleIdByName } from '@/utils';
import { useToast } from '@/context/toast';
import { addUserToChemists } from '@/actions/auth';
import {
  addUser,
  getUserRoles,
  updatePublishUser,
  updateUser,
  uploadImageToImgbb,
} from '@/services';

// Rules
import { CHEMIST_FORM_VALIDATION } from './rule';

export type ChemistFormProps = {
  specialtyOptions: Option[];
  id?: string;
  data?: UserModel;
  onClose: () => void;
};

const ChemistForm = memo(
  ({ id = '', data, specialtyOptions, onClose }: ChemistFormProps) => {
    const {
      username = '',
      email = '',
      password = '',
      description = '',
      rating = 0,
      tasks = 0,
      reviews = 0,
      specialtyId,
      avatar,
    } = data || {};

    const { id: specialty } = specialtyId?.data || {};

    const [imageUpload, setImageUpload] = useState<string>('');
    const [formImage, setFormImage] = useState<FormData | null>(null);

    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [roles, getRoles] = useState<RolePermission[]>([]);

    const openToast = useToast();

    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const {
      control,
      handleSubmit,
      getValues,
      clearErrors,
      setError: setFormError,
      formState: { errors, isValid, isLoading, isDirty },
      trigger,
    } = useForm<ChemistFormData>({
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      defaultValues: {
        avatar: avatar || AVATAR_THUMBNAIL,
        username,
        password,
        confirmPassWord: password,
        email,
        description,
        specialtyId: specialty?.toString(),
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

    // Handle show hide password
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] =
      useState<boolean>(false);
    const handleToggleVisiblePassword = useCallback(
      () => setIsShowPassword((prev) => !prev),
      [],
    );
    const handleToggleShowConfirmPassword = useCallback(
      () => setIsShowConfirmPassword((prev) => !prev),
      [],
    );

    // Handle input file changes
    const handleUpload =
      (callback: (value: string) => void) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
          const image = files[0];
          const formData = new FormData();
          formData.append('image', image);

          setFormImage(formData);
          setImageUpload(URL.createObjectURL(image));
          callback(URL.createObjectURL(image));
        }
      };

    // Handle remove upload image
    const handleRemoveImage = (callback: (value: string) => void) => () => {
      setImageUpload('');
      setFormImage(null);
      callback('');

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

    const handleError = useCallback(
      (error: string) => {
        if (error === ERROR_MESSAGE.DUPLICATE_FIELD)
          error = ERROR_MESSAGE.USERNAME;

        setError(error);

        openToast({
          message: ERROR_MESSAGE.CREATE('chemist'),
          type: STATUS_TYPE.ERROR,
        });
        setIsPending(false);
        return;
      },
      [openToast],
    );

    // Handle submit form data to create chemist
    const handleSubmitForm: SubmitHandler<ChemistFormData> = useCallback(
      async (formData) => {
        setError('');
        setIsPending(true);

        const { avatar, username, email, password, specialtyId, description } =
          formData;

        const avatarUpload =
          (formImage && (await uploadImageToImgbb(formImage)).image) || '';

        const payload: UserPayload = {
          username,
          email,
          description,
          specialtyId: Number(specialtyId),
          role: Number(getRoleIdByName(roles, ROLE.NORMAL_USER)),
          avatar: avatarUpload || avatar,
          ...(!isEdit && { password }),
        };

        if (isEdit) {
          const { error } = await updateUser(id, payload);

          if (error) {
            handleError(error);
            return;
          }

          return;
        }

        const { user, error } = await addUser(payload);

        if (error) {
          handleError(error);
          return;
        }

        if (!user) return;

        const { id: userId = '' } = user;

        const updateUserResult = await updatePublishUser(userId);

        if (updateUserResult.error) {
          handleError(updateUserResult.error);
          return;
        }

        const addUserResult = await addUserToChemists({
          users_permissions_user: userId,
        });

        if (addUserResult.error) {
          handleError(addUserResult.error);
          return;
        }

        openToast({
          message: isEdit
            ? SUCCESS_MESSAGE.UPDATE('chemist')
            : SUCCESS_MESSAGE.CREATE('chemist'),
          type: STATUS_TYPE.SUCCESS,
        });

        setIsPending(false);
        onClose();
      },
      [formImage, handleError, id, isEdit, onClose, openToast, roles],
    );

    const handleCloseSelect = (field: keyof ChemistFormData) => () => {
      trigger(field);
    };

    return (
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="p-4 flex flex-col"
        data-testid="chemist-form"
      >
        <Text variant="title" size="xl">
          {isEdit ? 'Update chemist' : 'Create chemist'}
        </Text>

        {/* Avatar */}
        <Controller
          control={control}
          name="avatar"
          render={({ field: { value, onChange, ...rest } }) => (
            <ImageUpload
              {...rest}
              ref={hiddenFileInput}
              data-testid="chemist-avatar"
              src={value}
              srcUpload={imageUpload}
              onRemoveImage={handleRemoveImage(onChange)}
              onUploadImage={handleUpload(onChange)}
              isDisabled={isPending}
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
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              isRequired
              label="Username"
              labelPlacement="outside"
              name={name}
              placeholder="Please enter username"
              type="text"
              size="sm"
              isDisabled={isLoading || isEdit || isPending}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              onChange={handleInputChange(name, onChange)}
            />
          )}
          rules={CHEMIST_FORM_VALIDATION.USERNAME}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              label="Email"
              isRequired
              labelPlacement="outside"
              name={name}
              placeholder="Please enter email"
              type="text"
              size="sm"
              isDisabled={isLoading || isEdit || isPending}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              onChange={handleInputChange(name, onChange)}
            />
          )}
          rules={CHEMIST_FORM_VALIDATION.EMAIL}
        />

        {!isEdit && (
          <>
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
                  isDisabled={isLoading || isPending}
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
                  isDisabled={isLoading || isPending}
                  isInvalid={!!error?.message}
                  errorMessage={error?.message}
                  onChange={handleInputChange(name, onChange)}
                />
              )}
              rules={CHEMIST_FORM_VALIDATION.CONFIRM_PASSWORD(
                getValues,
                isEdit,
              )}
            />
          </>
        )}

        {/* Specialty */}
        <Controller
          control={control}
          name="specialtyId"
          rules={CHEMIST_FORM_VALIDATION.SPECIALTY}
          render={({
            field: { name, value, onChange, onBlur: _onBlur, ...rest },
            fieldState: { error },
          }) => (
            <Select
              {...rest}
              name={name}
              value={value}
              label="Specialty"
              data-testid="specialty-select"
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
              isDisabled={isLoading || isPending}
              selectedKeys={[value]}
              options={specialtyOptions}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              onChange={onChange}
              onClose={handleCloseSelect(name)}
            />
          )}
        />

        {/* Description */}
        <Controller
          name="description"
          control={control}
          render={({
            field: { name, value, onChange, ...rest },
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
                inputWrapper:
                  'border-text-foreground border-1 data-[focus=true]:border-secondary-300 group-data-[focus-visible=true]:ring-0',
                errorMessage: 'text-danger text-xs ml-2',
                label: 'text-sm',
              }}
              isDisabled={isLoading || isPending}
              placeholder="Please enter description"
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              onChange={handleInputChange(name, onChange)}
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
              onClick={onClose}
              variant="outline"
              color="outline"
              className="font-medium"
              isDisabled={isPending}
            >
              Cancel
            </Button>
            <Button
              isDisabled={!isValid || !isDirty || isPending}
              isLoading={isLoading || isPending}
              type="submit"
              data-testid="submit"
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
