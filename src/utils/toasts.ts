import { toast } from 'react-toastify';

export const errorResponse = (e: Error) => {
  console.error(e.message);
  toast.error("Nimadir notog'ri ketti, birozdan so'ng urinib ko'ring");
};
