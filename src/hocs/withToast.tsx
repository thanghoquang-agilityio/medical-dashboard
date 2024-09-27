'use client';

import React, { ReactNode, useState } from 'react';

import { STATUS_TYPE } from '@/types';
import { Toast } from '@/components/ui';

export interface ToastProps {
  type?: STATUS_TYPE;
  message?: string;
}

export const buildToastRenderer = ({ type, message }: ToastProps) => {
  switch (type) {
    case STATUS_TYPE.WARNING:
      return {
        message: message ?? 'Warning!',
        status: STATUS_TYPE.WARNING,
      };

    case STATUS_TYPE.ERROR:
      return {
        message: message ?? 'Error!',
        status: STATUS_TYPE.ERROR,
      };

    case STATUS_TYPE.SUCCESS:
    default:
      return {
        message: message ?? 'Success!',
        status: STATUS_TYPE.SUCCESS,
      };
  }
};

type ToastState = ToastProps & { isOpen: boolean };

export type TWithToast<T> = {
  openToast: (toast: ToastProps, callback?: () => void) => void;
} & T;

export const withToast = <T,>(
  Child: (props: TWithToast<T>) => ReactNode,
  enableLoading?: boolean,
) => {
  const RenderToast = (props: T) => {
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<ToastState>({
      isOpen: false,
      type: STATUS_TYPE.SUCCESS,
    });

    const closeToast = () => {
      setToast({
        ...toast,
        isOpen: false,
      });
    };

    const openToast = (
      { type = STATUS_TYPE.SUCCESS, message }: ToastProps,
      callback?: () => void,
    ) => {
      const isShowLoading = callback && enableLoading;

      isShowLoading && setIsLoading(true);

      setToast({ isOpen: true, type, message });

      setTimeout(() => {
        closeToast();
        isShowLoading && setIsLoading(false);
        callback?.();
      }, 3000);
    };

    const { message, status } = buildToastRenderer(toast);

    return (
      <>
        {toast.isOpen && (
          <Toast message={message} status={status} onClose={closeToast} />
        )}
        {isLoading ? <>loading</> : <Child {...props} openToast={openToast} />}
      </>
    );
  };

  return RenderToast;
};
