'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TimeInputValue } from '@nextui-org/react';

// Types
import { AppointMentFormData, AppointmentModel, UserLogged } from '@/types';

// Utils
import { getCurrentDate, convertToTimeObject, transformUsers } from '@/utils';

// Components
import { Button, Input, Select, Text, TimeInput } from '@/components/ui';

// Constants
import { APPOINTMENT_STATUS, DURATION_TIME_OPTIONS, ROLE } from '@/constants';

// Rule
import { APPOINTMENT_FORM_VALIDATION } from './rule';
import { getUsers } from '@/actions/user';

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

const AppointmentForm = memo(
  ({ userId, role, data, onClose }: AppointmentModalProps) => {
    const {
      startTime = '',
      durationTime = '',
      status = 0,
      senderId: senderResponse,
      receiverId: receiverResponse,
    } = data || {};

    const { data: sender } = senderResponse || {};
    const { data: receiver } = receiverResponse || {};
    const { id: senderId = '' } = sender || {};
    const { id: receiverId = '' } = receiver || {};

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
        startDate: startTime && getCurrentDate(startTime),
        startTime: startTime,
        durationTime: durationTime,
        status: status,
        senderId: senderId.toString(),
        receiverId: receiverId.toString(),
      },
    });

    const [users, setUsers] = useState<UserLogged[]>([]);

    useEffect(() => {
      const fetchUsers = async () => {
        const users = await getUsers();
        if (typeof users === 'string') throw users;
        setUsers(users);
      };

      fetchUsers();
    }, []);
    const OPTION_USERS = transformUsers(users);
    const isAdmin = role === ROLE.ADMIN;
    const isEdit = !!data;

    const handleStartTime = (value: TimeInputValue) => {
      // TODO: update convert value
      value;
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
          {isEdit ? 'Update appointment' : 'Create appointment'}
        </Text>

        <div className="flex flex-col md:flex-row md:gap-3 mt-6">
          <Controller
            control={control}
            name="senderId"
            rules={APPOINTMENT_FORM_VALIDATION.SENDER_ID}
            render={({
              field: { name, value, ...rest },
              fieldState: { error },
            }) => (
              <Select
                {...rest}
                name={name}
                value={value}
                label="Sender"
                placeholder="Select sender"
                labelPlacement="outside"
                variant="bordered"
                classNames={selectCustomStyle}
                defaultSelectedKeys={!isAdmin ? [userId] : [value]}
                isDisabled={!isAdmin}
                options={OPTION_USERS}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
              />
            )}
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
                defaultSelectedKeys={[value]}
                options={OPTION_USERS}
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
            render={({ field: { name, value }, fieldState: { error } }) => {
              const timeValue = convertToTimeObject(value) as TimeInputValue;
              return (
                <TimeInput
                  label="Start Time"
                  name={name}
                  value={timeValue}
                  labelPlacement="outside"
                  onChange={handleStartTime}
                  errorMessage={error?.message}
                  isInvalid={!!error?.message}
                />
              );
            }}
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
              defaultSelectedKeys={
                value.toString() ?? APPOINTMENT_STATUS[0].key
              }
              disabledKeys={value.toString()}
              name={name}
              value={value}
              classNames={selectCustomStyle}
              isDisabled={!isAdmin}
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
          <Button isDisabled={!isValid || !isDirty} type="submit">
            {/* TODO: check user role and isEditing variable to display different text */}
            Submit
          </Button>
        </div>
      </form>
    );
  },
);

export default AppointmentForm;
AppointmentForm.displayName = 'AppointmentForm';
