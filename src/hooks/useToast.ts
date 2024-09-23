import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Constants
import { TOAST_AUTO_CLOSE, TOAST_POSITION, TOAST_STATUS } from '@/constants';

export const useToast = () => {
  const showToast = (
    message: string,
    status: TOAST_STATUS,
    position = TOAST_POSITION.TOP_RIGHT,
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
