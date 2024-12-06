'use client';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

// Types
import {
  SendMoneyFormData,
  SendMoneyPayload,
  STATUS_TYPE,
  UserLogged,
} from '@/types';

// Components
import { Button, Input, Select, Text } from '@/components/ui';

// Actions
import { getUsers } from '@/actions/user';

// Utils
import {
  clearErrorOnChange,
  formatCurrency,
  isEnableSubmit,
  parseCurrency,
  transformUsers,
} from '@/utils';

// Validation
import { SEND_MONEY_FORM_VALIDATION } from './rule';
import { getUser, sendMoney } from '@/services';
import { useToast } from '@/context/toast';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '@/constants';
const selectCustomStyle = {
  mainWrapper: 'h-16',
  trigger: 'h-[auto] py-3 max-h-10',
  errorMessage: 'text-danger text-xs ml-2',
  label: 'top-5 text-sm',
  value: 'text-sm text-primary-100',
};

export type SendMoneyFormProps = {
  id: string;
  email: string;
  onClose: () => void;
  currentBalance: number;
  currentSpending: number;
};
const SendMoneyForm = ({
  id,
  onClose,
  email,
  currentBalance,
  currentSpending,
}: SendMoneyFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isLoading, errors, dirtyFields },
    clearErrors,
    trigger,
    getValues,
  } = useForm<SendMoneyFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      amount: '$0.00',
      senderId: id,
      receiverId: undefined,
    },
  });

  const [users, setUsers] = useState<UserLogged[]>([]);
  const [isPending, setIsPending] = useState(false);

  const openToast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      const { users, error } = await getUsers();
      if (error) throw error;
      setUsers(users);
    };

    fetchUsers();
  }, []);

  const userOptions = useMemo(() => transformUsers(users), [users]);

  const handleCloseSelect = useCallback(
    (field: keyof SendMoneyFormData) => () => {
      trigger(field);
    },
    [trigger],
  );

  const handleInputChange = useCallback(
    (name: keyof SendMoneyFormData, onChange: (value: string) => void) => {
      return (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        // Clear error message on change
        clearErrorOnChange(name, errors, clearErrors);
      };
    },
    [clearErrors, errors],
  );

  const handleNumericInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const inputField = e.target as HTMLInputElement;

      inputField.value = formatCurrency(inputField.value);
    },
    [],
  );

  const dirtyFieldList = Object.keys(dirtyFields);

  const isDisabled = useMemo(() => {
    const REQUIRED_FIELDS: Array<keyof SendMoneyFormData> = [
      'amount',
      'receiverId',
    ];
    return !isEnableSubmit(REQUIRED_FIELDS, dirtyFieldList, errors);
  }, [dirtyFieldList, errors]);

  const handleSubmitForm: SubmitHandler<SendMoneyFormData> = useCallback(
    async (data) => {
      setIsPending(true);

      const amount = parseCurrency(data.amount);

      const isNotEnoughMoney = currentBalance - amount < 0;

      if (isNotEnoughMoney) {
        openToast({
          type: STATUS_TYPE.ERROR,
          message: ERROR_MESSAGE.TRANSFER(ERROR_MESSAGE.INSUFFICIENT_FUND),
        });
        onClose();
        return;
      }

      const { user: receiver, error: receiverError } = await getUser(
        data.receiverId,
      );

      const { balance: receiverBalance = 0 } = receiver || {};

      if (receiverError) {
        openToast({
          type: STATUS_TYPE.ERROR,
          message: ERROR_MESSAGE.TRANSFER(receiverError),
        });
        onClose();
        return;
      }

      const sendPayload: SendMoneyPayload = {
        senderId: data.senderId,
        senderBalance: currentBalance - amount,
        senderSpending: currentSpending + amount,
        receiverId: data.receiverId,
        receiverBalance: receiverBalance + amount,
        amount,
      };

      const { user, error } = await sendMoney(sendPayload);

      if (user)
        openToast({
          type: STATUS_TYPE.SUCCESS,
          message: SUCCESS_MESSAGE.TRANSFER,
        });

      if (error)
        openToast({
          type: STATUS_TYPE.ERROR,
          message: ERROR_MESSAGE.TRANSFER(error),
        });

      setIsPending(false);
      onClose();
    },
    [currentBalance, currentSpending, onClose, openToast],
  );

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="p-4 flex flex-col"
    >
      <Text variant="title" size="xl">
        Send money
      </Text>

      <div className="flex flex-col md:flex-row md:gap-3 mt-6">
        <Controller
          control={control}
          name="senderId"
          rules={SEND_MONEY_FORM_VALIDATION.SENDER_ID(getValues)}
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
              isDisabled
              selectedKeys={[value]}
              options={[
                {
                  key: value,
                  label: email,
                },
              ]}
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
          rules={SEND_MONEY_FORM_VALIDATION.RECEIVER_ID(getValues)}
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
              selectedKeys={[value]}
              options={userOptions}
              isInvalid={!!error?.message}
              isDisabled={
                //  isPending ||
                !users.length
              }
              errorMessage={error?.message}
              onChange={onChange}
              onClose={handleCloseSelect(name)}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name="amount"
        render={({
          field: { name, value, onChange, ...rest },
          fieldState: { error },
        }) => (
          <Input
            {...rest}
            label="Money to receive"
            labelPlacement="outside"
            size="sm"
            type="text"
            placeholder="$0.00"
            name={name}
            value={value}
            onChange={handleInputChange(name, onChange)}
            onInput={handleNumericInput}
            isInvalid={!!error?.message}
            errorMessage={error?.message}
          />
        )}
        rules={SEND_MONEY_FORM_VALIDATION.AMOUNT}
      />
      <div className="flex flex-col justify-end">
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
            isDisabled={isDisabled}
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
};

export default SendMoneyForm;
