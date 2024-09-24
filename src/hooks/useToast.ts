import { toast, TypeOptions, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Constants
import { TIME } from '@/constants';

export const useToast = () => {
  const showToast = (
    message: string,
    status: TypeOptions,
    position: ToastPosition = 'top-right',
  ) => {
    toast(message, {
      autoClose: TIME.AUTO_CLOSE,
      type: status,
      position: position,
      style: { fontSize: '12px' },
      theme: 'colored',
    });
  };

  return { showToast };
};
