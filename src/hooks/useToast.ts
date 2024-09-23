import { toast, TypeOptions, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Constants
import { TOAST_AUTO_CLOSE } from '@/constants';

export const useToast = () => {
  const showToast = (
    message: string,
    status: TypeOptions,
    position: ToastPosition = 'top-right',
  ) => {
    toast(message, {
      autoClose: TOAST_AUTO_CLOSE,
      type: status,
      position: position,
      style: { fontSize: '12px' },
    });
  };

  return { showToast };
};
