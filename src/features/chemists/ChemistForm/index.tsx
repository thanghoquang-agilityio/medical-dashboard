'use client';

import { Textarea, useDisclosure } from '@nextui-org/react';
import { memo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

// Components
import { Button, ImageUpload, Input, Select, Text } from '@/components/ui';
import { NoteIcon, StarIcon } from '@/icons';

// Types
import { UserModel, ChemistFormData } from '@/types';

// Utils
import { transformSpecialties } from '@/utils';

// Rules
import { MOCK_SPECIALTIES } from '@/mocks/chemists';
import { CHEMIST_FORM_VALIDATION } from './rule';

export type ChemistFormProps = {
  id?: string;
  data?: UserModel;
  onClose?: () => void;
};

const ChemistForm = memo(({ data }: ChemistFormProps) => {
  const {
    username = '',
    email = '',
    avatar = '',
    description = '',
    rating = 0,
    tasks = 0,
    reviews = 0,
    specialtyId,
  } = data || {};

  const { onOpen } = useDisclosure();
  const [imageUpload, setImageUpload] = useState<string | undefined>(undefined);
  const [imageRemote, setImageRemote] = useState<string | undefined>(
    avatar.toString(),
  );
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, isLoading },
  } = useForm<ChemistFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      avatar: avatar.toString(),
      username,
      email,
      description,
      specialtyId: specialtyId?.data.id,
    },
  });

  const isEdit = !!data;

  // Handle input changes
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const image = files[0];
      setImageUpload(URL.createObjectURL(image));
      setValue('avatar', URL.createObjectURL(image));
    }
  };

  // Handle remove upload image
  const handleRemoveImage = () => {
    setImageUpload('');
    setValue('avatar', '');
    setImageRemote('');

    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = '';
    }
  };

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  // TODO: Update handle submit later
  const onSubmit = async (data: ChemistFormData) => {
    console.log(data);
  };

  // TODO: Update options later from API
  const OPTION_SPECIALTIES = transformSpecialties(MOCK_SPECIALTIES);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col">
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
            isInvalid={!!error?.message}
            errorMessage={error?.message}
          />
        )}
        rules={CHEMIST_FORM_VALIDATION.EMAIL}
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
              label: 'top-5 text-sm',
              value: 'text-sm text-primary-100',
            }}
            defaultSelectedKeys={value}
            options={OPTION_SPECIALTIES}
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
            }}
            placeholder="Please enter description"
            isInvalid={!!error?.message}
            errorMessage={error?.message}
          />
        )}
        rules={CHEMIST_FORM_VALIDATION.DESCRIPTION}
      />

      <div className="h-[78px] flex flex-col justify-end">
        {/* TODO: Add error when interacting with API
        {error && (
              <Text variant="error" size="sm" customClass="py-2">
                {error}
              </Text>
            )} */}
        <div className="w-full gap-2 flex justify-end">
          <Button
            onClick={onOpen}
            variant="outline"
            color="outline"
            className="font-medium"
          >
            Cancel
          </Button>
          <Button isDisabled={!isValid} isLoading={isLoading} type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
});

export default ChemistForm;
ChemistForm.displayName = 'ChemistForm';
