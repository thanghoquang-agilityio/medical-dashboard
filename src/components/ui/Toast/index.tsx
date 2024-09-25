// Types
import { STATUS_TYPE } from '@/types';

// Utils
import { cn } from '@/utils';

// Components
import { CheckIcon, CloseIcon, InfoIcon, XmarkIcon } from '@/icons';
import { Button } from '../Button';

interface ToastProps {
  message: string;
  status: STATUS_TYPE;
  onClose: () => void;
}

export const Toast = ({
  message,
  status,
  onClose,
}: ToastProps): JSX.Element => {
  const getStatusColor = () => {
    switch (status) {
      case STATUS_TYPE.SUCCESS:
        return 'bg-success text-success';

      case STATUS_TYPE.ERROR:
        return 'bg-danger-100 text-danger-100';

      default:
        return 'bg-warning text-warning';
    }
  };

  const getIcon = () => {
    switch (status) {
      case STATUS_TYPE.SUCCESS:
        return <CheckIcon customClass="w-5 h-5" />;

      case STATUS_TYPE.ERROR:
        return <CloseIcon customClass="w-5 h-5" />;

      default:
        return <InfoIcon customClass="w-5 h-5" />;
    }
  };

  return (
    <div className="flex items-center justify-between w-full max-w-xs p-4 mb-4 rounded-lg shadow-lg">
      <div className="flex items-center">
        <div
          className={cn(
            'inline-flex items-center justify-center bg-opacity-20 flex-shrink-0 w-8 h-8 rounded-lg',
            getStatusColor(),
          )}
          data-testid="toast-icon"
        >
          {getIcon()}
        </div>
        <p className="ms-3 text-sm text-primary-200">{message}</p>
      </div>

      <Button isIconOnly onClick={onClose} color="stone" className="min-w-8">
        <XmarkIcon customClass="w-3 h-3" />
      </Button>
    </div>
  );
};
