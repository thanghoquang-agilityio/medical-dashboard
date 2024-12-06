'use client';
import { ChangeEvent, memo, useCallback, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

// Components
import { Button, Input, Text } from '@/components/ui';

// Types
import { ReceiveMoneyFormData, STATUS_TYPE, UserModel } from '@/types';

// Utils
import {
  clearErrorOnChange,
  formatCurrency,
  isEnableSubmit,
  parseCurrency,
} from '@/utils';

// Services
import { addMoneyToUser } from '@/services';

// Hooks
import { useToast } from '@/context/toast';

// Constants
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '@/constants';

// Validation
import { RECEIVE_MONEY_FORM_VALIDATION } from './rule';

export type ReceiveMoneyFormProps = {
  id: string;
  currentBalance: number;
  onClose: () => void;
};
const ReceiveMoneyForm = memo(
  ({ id, onClose, currentBalance }: ReceiveMoneyFormProps) => {
    const [isPending, setIsPending] = useState(false);

    const {
      control,
      handleSubmit,
      formState: { isLoading, errors, dirtyFields },
      clearErrors,
    } = useForm<ReceiveMoneyFormData>({
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      defaultValues: {
        amount: '$0.00',
        id: id,
      },
    });

    const openToast = useToast();

    const handleInputChange = useCallback(
      (name: keyof ReceiveMoneyFormData, onChange: (value: string) => void) => {
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
      const REQUIRED_FIELDS: Array<keyof ReceiveMoneyFormData> = ['amount'];
      return !isEnableSubmit(REQUIRED_FIELDS, dirtyFieldList, errors);
    }, [dirtyFieldList, errors]);

    const handleSubmitForm: SubmitHandler<ReceiveMoneyFormData> = useCallback(
      async (data) => {
        setIsPending(true);
        const receivePayload: Pick<UserModel, 'balance'> = {
          balance: parseCurrency(data.amount) + currentBalance,
        };

        const { user, error } = await addMoneyToUser(receivePayload, id);

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
      [currentBalance, id, onClose, openToast],
    );
    return (
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="p-4 flex flex-col"
      >
        <Text variant="title" size="xl">
          Reiceive money
        </Text>

        <div className="mt-6">
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
            rules={RECEIVE_MONEY_FORM_VALIDATION.AMOUNT}
          />
        </div>
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
  },
);

ReceiveMoneyForm.displayName = 'ReceiveMoneyForm';
export default ReceiveMoneyForm;
