import { toast } from 'react-toastify';

interface ToastProps {
  type: string;
  message: string;
}

export const showToast = ({ type, message }: ToastProps) => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    default:
      toast.info(message);
  }
};
