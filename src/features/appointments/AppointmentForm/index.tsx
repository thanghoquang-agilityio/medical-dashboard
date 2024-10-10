'use client';

import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TimeInputValue } from '@nextui-org/react';

// Types
import {
  AppointmentModel,
  AppointmentResponse,
  ROLE,
  STATUS_TYPE,
  UserLogged,
} from '@/types';

// Utils
import {
  getCurrentDate,
  convertToTimeObject,
  transformUsers,
  generateISODate,
  convertMinutesToTime,
  convertTimeToMinutes,
  generateTimeOptions,
  clearErrorOnChange,
} from '@/utils';

// Components
import { Button, Input, Select, Text, TimeInput } from '@/components/ui';

// Constants
import {
  APPOINTMENT_STATUS,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '@/constants';

// Hocs
import { useToast } from '@/context/toast';

// Actions
import { getUsers } from '@/actions/user';
import { addAppointment, updateAppointment } from '@/actions/appointment';
import { createNotifications } from '@/services/notificationFirebase';

// Rules
import { APPOINTMENT_FORM_VALIDATION } from './rule';

export type AppointmentModalProps = {
  userId: string;
  role: string;
  id?: string;
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

export interface AppointMentForm
  extends Omit<AppointmentModel, 'senderId' | 'receiverId' | 'startTime'> {
  senderId: string;
  receiverId: string;
  startTime: TimeInputValue;
  startDate: string;
}

const AppointmentForm = memo(
  ({ userId, role, data, onClose, id = '' }: AppointmentModalProps) => {
    const {
      startTime,
      durationTime,
      status = 0,
      senderId: senderResponse,
      receiverId: receiverResponse,
    } = data || {};

    const { data: sender } = senderResponse || {};
    const { data: receiver } = receiverResponse || {};
    const { id: senderId = '' } = sender || {};
    const { id: receiverId = '' } = receiver || {};

    const openToast = useToast();
    const isAdmin = role === ROLE.ADMIN;

    const {
      control,
      handleSubmit,
      getValues,
      watch,
      formState: { isValid, isDirty, isLoading, errors, dirtyFields },
      trigger,
      clearErrors,
    } = useForm<AppointMentForm>({
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      defaultValues: {
        startDate: startTime && getCurrentDate(startTime),
        startTime: startTime && convertToTimeObject(startTime),
        durationTime:
          durationTime && convertTimeToMinutes(durationTime).toString(),
        status: status,
        senderId: isAdmin ? senderId.toString() : userId,
        receiverId: receiverId.toString(),
      },
    });

    const [users, setUsers] = useState<UserLogged[]>([]);
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
      const fetchUsers = async () => {
        const { users, error } = await getUsers();
        if (error) throw error;
        setUsers(users);
      };

      fetchUsers();
    }, []);

    const OPTION_USERS = transformUsers(users);
    const isEdit = !!data;

    const onSubmit = async ({
      startDate,
      startTime,
      durationTime,
      ...rest
    }: AppointMentForm) => {
      const formatData = {
        ...rest,
        startTime: generateISODate(startTime, startDate),
        durationTime: convertMinutesToTime(durationTime || ''),
      };

      setError('');
      setIsPending(true);
      let error: string | null;
      let appointmentCreated: AppointmentResponse | null;

      if (isEdit) error = (await updateAppointment(id, formatData)).error;
      else {
        const { error: errorCreated, appointment } =
          await addAppointment(formatData);
        error = errorCreated;
        appointmentCreated = appointment;
        const { id = '', attributes = {} as AppointmentModel } =
          appointmentCreated || {};

        await createNotifications({
          appointment: attributes,
          idAppointment: id,
          message: 'have been created appointment',
        });
      }

      if (error) {
        setError(error);
        openToast({
          message: isEdit
            ? ERROR_MESSAGE.UPDATE('appointment')
            : ERROR_MESSAGE.CREATE('appointment'),
          type: STATUS_TYPE.ERROR,
        });
        setIsPending(false);

        return;
      }

      openToast({
        message: isEdit
          ? SUCCESS_MESSAGE.UPDATE('appointment')
          : SUCCESS_MESSAGE.CREATE('appointment'),
        type: STATUS_TYPE.SUCCESS,
      });
    };

    const durationTimeOptions = generateTimeOptions();

    const handleCloseSelect = (field: keyof AppointMentForm) => () => {
      trigger(field);
    };

    const handleInputChange = useCallback(
      (name: keyof AppointMentForm, onChange: (value: string) => void) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);

          // Clear error message on change
          clearErrorOnChange(name, errors, clearErrors);
        };
      },
      [clearErrors, errors],
    );

    useEffect(() => {
      if (watch('startDate') && dirtyFields.startTime) {
        trigger('startTime');
      }
    }, [watch('startDate')]);

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <Text variant="title" size="xl">
            {isEdit ? 'Update appointment' : 'Create appointment'}
          </Text>

          <div className="flex flex-col md:flex-row md:gap-3 mt-6">
            <Controller
              control={control}
              name="senderId"
              rules={APPOINTMENT_FORM_VALIDATION.SENDER_ID(getValues)}
              render={({
                field: { name, value, onChange, onBlur: _onBlur, ...rest },
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
                  isDisabled={isEdit || !isAdmin}
                  options={OPTION_USERS}
                  isInvalid={!!error?.message}
                  errorMessage={error?.message}
                  onChange={onChange}
                  onClose={handleCloseSelect(name)}
                />
              )}
            />

            <Controller
              control={control}
              name="receiverId"
              rules={APPOINTMENT_FORM_VALIDATION.RECEIVER_ID(getValues)}
              render={({
                field: { name, value, onChange, onBlur: _onBlur, ...rest },
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
                  aria-label="Receiver"
                  classNames={selectCustomStyle}
                  defaultSelectedKeys={[value]}
                  options={OPTION_USERS}
                  isInvalid={!!error?.message}
                  isDisabled={isEdit}
                  errorMessage={error?.message}
                  onChange={onChange}
                  onClose={handleCloseSelect(name)}
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
                  aria-label="Start Date"
                  size="sm"
                  name={name}
                  defaultValue={value}
                  onChange={handleInputChange(name, onChange)}
                  isInvalid={!!error?.message}
                  errorMessage={error?.message}
                  isDisabled={isPending}
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
              render={({
                field: { name, value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TimeInput
                  label="Start Time"
                  name={name}
                  value={value}
                  labelPlacement="outside"
                  onChange={onChange}
                  onBlur={onBlur}
                  errorMessage={error?.message}
                  isInvalid={!!error?.message}
                  isDisabled={!watch('startDate') || isPending}
                  onFocusChange={() => {
                    clearErrorOnChange(name, errors, clearErrors);
                  }}
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
              field: { name, value, onChange, onBlur: _onBlur, ...rest },
              fieldState: { error },
            }) => (
              <Select
                {...rest}
                label="Duration Time"
                placeholder="Duration Time"
                labelPlacement="outside"
                aria-label="Duration Time"
                classNames={selectCustomStyle}
                options={durationTimeOptions}
                name={name}
                value={value}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                isDisabled={isPending}
                onChange={onChange}
                selectedKeys={[value]}
                onClose={handleCloseSelect(name)}
              />
            )}
          />

          {/* Status */}
          <Controller
            control={control}
            name="status"
            rules={APPOINTMENT_FORM_VALIDATION.STATUS}
            render={({
              field: { name, value, onChange, onBlur: _onBlur, ...rest },
              fieldState: { error },
            }) => (
              <Select
                {...rest}
                label="Status"
                placeholder="Status"
                labelPlacement="outside"
                aria-label="Status"
                options={APPOINTMENT_STATUS}
                defaultSelectedKeys={
                  value.toString() ?? APPOINTMENT_STATUS[0].key
                }
                disabledKeys={value.toString()}
                name={name}
                value={value}
                classNames={selectCustomStyle}
                isDisabled={!isAdmin || isPending}
                onChange={onChange}
                isInvalid={!!error?.message}
                errorMessage={error?.message}
                onClose={handleCloseSelect(name)}
              />
            )}
          />

          <div className="h-[78px] flex flex-col justify-end">
            {error && (
              <Text variant="error" size="sm" customClass="py-2">
                {error}
              </Text>
            )}
            <div className="w-full gap-2 flex justify-end">
              <Button
                variant="outline"
                color="outline"
                className="font-medium"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                isDisabled={!isValid || !isDirty || isPending}
                isLoading={isLoading || isPending}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </>
    );
  },
);

export default AppointmentForm;
AppointmentForm.displayName = 'AppointmentForm';
