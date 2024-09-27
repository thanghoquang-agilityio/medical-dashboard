// Types
import { STATUS_TYPE } from '@/types';
import { Card } from '@nextui-org/react';

// Utils
import { cn } from '@/utils';

// Components
import { CheckIcon, CloseIcon, InfoIcon, XmarkIcon } from '@/icons';
import { Button } from '../Button';

interface ToastProps {
  message: string;
  status: STATUS_TYPE;
  onClose?: () => void;
}

export const Toast = ({
  message,
  status,
  onClose,
}: ToastProps): JSX.Element => {
  const getStatusColor = () => {
    switch (status) {
      case STATUS_TYPE.SUCCESS:
        return 'text-success';

      case STATUS_TYPE.ERROR:
        return 'text-danger-100';

      default:
        return 'text-warning';
    }
  };

  const getIcon = () => {
    switch (status) {
      case STATUS_TYPE.SUCCESS:
        return (
          <CheckIcon
            customClass={cn(
              'inline-flex items-center justify-center bg-opacity-20 flex-shrink-0 w-5 h-5 rounded-lg',
              getStatusColor(),
            )}
          />
        );

      case STATUS_TYPE.ERROR:
        return (
          <CloseIcon
            customClass={cn(
              'inline-flex items-center justify-center bg-opacity-20 flex-shrink-0 w-5 h-5 rounded-lg',
              getStatusColor(),
            )}
          />
        );

      default:
        return (
          <InfoIcon
            customClass={cn(
              'inline-flex items-center justify-center bg-opacity-20 flex-shrink-0 w-5 h-5 rounded-lg',
              getStatusColor(),
            )}
          />
        );
    }
  };

  return (
    <Card
      className="flex flex-row fixed z-[999] items-center justify-between w-full max-w-xs p-4 rounded-lg top-5 right-5 bg-background-100"
      role="alert"
      data-testid="toast"
    >
      {getIcon()}
      <p className="text-sm text-primary-200 max-w-[220px] ml-2 mr-3">
        {message}
      </p>

      <Button
        isIconOnly
        onClick={onClose}
        color="stone"
        className="min-w-5 p-0"
      >
        <XmarkIcon customClass="w-3 h-3" />
      </Button>
    </Card>
  );
};
