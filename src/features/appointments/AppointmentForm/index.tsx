'use client';

import { Controller, useForm } from 'react-hook-form';
import { TimeInputValue } from '@nextui-org/react';
import { useCallback } from 'react';

// Types
import { AppointMentFormData, AppointmentModel } from '@/types';

// Utils
import {
  convertToHHmm,
  getCurrentDate,
  getCurrentTime,
  transformUsers,
} from '@/utils';

// Components
import { Button, Input, Select, Text, TimeInput } from '@/components/ui';

// Mocks
import { USER_OPTIONS } from '@/mocks/user';

// Constants
import { APPOINTMENT_STATUS, DURATION_TIME_OPTIONS, ROLE } from '@/constants';

// Rule
import { APPOINTMENT_FORM_VALIDATION } from './rule';

export type AppointmentModalProps = {
  userId: string;
  role: string;
  data?: AppointmentModel;
  onClose: () => void;
};

const selectCustomStyle = {
  mainWrapper: 'h-16',
  trigger: 'h-[auto] py-3 max-h-10',
  errorMessage: 'text-danger text-xs ml-2',
  label: 'top-5 text-sm',
  value: 'text-sm text-primary-100',
};

const AppointmentForm = ({
  userId,
  role,
  data,
  onClose,
}: AppointmentModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
    getValues,
  } = useForm<AppointMentFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      startDate: data?.startTime ? getCurrentDate(data?.startTime) : undefined,
      startTime: data?.startTime ? getCurrentTime(data?.startTime) : '00:00',
      durationTime: convertToHHmm(data?.durationTime) || '00:01',
      status: data?.status.toString() || '0',
      // TODO: Replace undefined with current userId
      senderId: Number(data?.senderId.data.id) || undefined,
      receiverId: Number(data?.receiverId.data.id) || undefined,
    },
  });

  // TODO: update default value
  console.log(userId);
  const isAdmin = role === ROLE.ADMIN;

  // TODO: Check with user role
  const isEditing = !!data;

  const handleStartTime = (value: TimeInputValue) => {
    // TODO: update convert value
    console.log(value);
  };

  const handleCloseModal = useCallback(() => {
    reset();

    onClose();
  }, [onClose, reset]);

  const onSubmit = (data: AppointMentFormData) => {
    // TODO: Implement onSubmit here
    data;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <Text variant="title" size="xl">
        {!isEditing ? 'Create appointment' : 'Update appointment'}
      </Text>

      <div className="flex flex-col md:flex-row md:gap-3 mt-6">
        <Select
          label="Sender"
          placeholder="Select sender"
          labelPlacement="outside"
          variant="bordered"
          classNames={selectCustomStyle}
          isDisabled={!isAdmin}
          // TODO: will get users latter
          options={transformUsers(USER_OPTIONS)}
        />

        <Controller
          control={control}
          name="receiverId"
          rules={APPOINTMENT_FORM_VALIDATION.RECEIVER_ID}
          render={({
            field: { name, value, ...rest },
            fieldState: { error },
          }) => (
            <Select
              {...rest}
              name={name}
              value={value}
              label="Receiver"
              placeholder="Select receiver"
              labelPlacement="outside"
              variant="bordered"
              classNames={selectCustomStyle}
              // TODO: will get users latter
              options={transformUsers(USER_OPTIONS)}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
            />
          )}
        />
      </div>

      <div className="flex flex-col md:flex-row md:gap-3 items-start">
        {/* Start Date */}
        <Controller
          control={control}
          name="startDate"
          rules={APPOINTMENT_FORM_VALIDATION.START_DATE}
          render={({
            field: { name, onChange, value, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              type="date"
              label="Start Date"
              labelPlacement="outside"
              size="sm"
              name={name}
              defaultValue={value}
              onChange={onChange}
              isInvalid={!!error?.message}
              errorMessage={error?.message}
              classNames={{
                inputWrapper: 'max-h-10',
                label: 'top-[17px] text-sm',
                input: 'text-sm',
                errorMessage: 'text-xs',
              }}
            />
          )}
        />

        {/* Start Time */}
        <Controller
          control={control}
          name="startTime"
          rules={APPOINTMENT_FORM_VALIDATION.START_TIME(getValues)}
          render={({ field: { name }, fieldState: { error } }) => (
            <TimeInput
              label="Start Time"
              name={name}
              labelPlacement="outside"
              onChange={handleStartTime}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
            />
          )}
        />
      </div>

      {/* Duration Time */}
      <Controller
        control={control}
        name="durationTime"
        rules={APPOINTMENT_FORM_VALIDATION.DURATION_TIME}
        render={({
          field: { name, value, ...rest },
          fieldState: { error },
        }) => (
          <Select
            {...rest}
            label="Duration Time"
            placeholder="Duration Time"
            labelPlacement="outside"
            classNames={selectCustomStyle}
            options={DURATION_TIME_OPTIONS}
            defaultSelectedKeys={DURATION_TIME_OPTIONS[0].key}
            name={name}
            value={value}
            isInvalid={!!error?.message}
            errorMessage={error?.message}
          />
        )}
      />

      {/* Status */}
      <Controller
        control={control}
        name="status"
        rules={APPOINTMENT_FORM_VALIDATION.STATUS}
        render={({
          field: { name, value, onChange },
          fieldState: { error },
        }) => (
          <Select
            label="Status"
            placeholder="Status"
            labelPlacement="outside"
            options={APPOINTMENT_STATUS}
            defaultSelectedKeys={APPOINTMENT_STATUS[0].key}
            disabledKeys={value}
            name={name}
            value={value}
            classNames={selectCustomStyle}
            isDisabled={isEditing}
            onChange={onChange}
            isInvalid={!!error?.message}
            errorMessage={error?.message}
          />
        )}
      />

      <div className="flex gap-4 justify-end mt-3">
        <Button
          onClick={handleCloseModal}
          variant="outline"
          color="outline"
          className="font-medium"
        >
          Cancel
        </Button>
        <Button disabled={!isValid || !isDirty} type="submit">
          {/* TODO: check user role and isEditing variable to display different text */}
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
