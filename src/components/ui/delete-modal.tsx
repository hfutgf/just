import { Trash2, AlertTriangle, X } from 'lucide-react';
import React from 'react';

import { Button } from './button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  itemName?: string;
  isLoading?: boolean;
};

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "O'chirishni tasdiqlang",
  description = "Bu amalni bekor qilib bo'lmaydi. Ma'lumotlar butunlay o'chiriladi.",
  itemName = '',
  isLoading = false,
}: Props) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      onClick={handleOverlayClick}
    >
      <div
        tabIndex={-1}
        className="relative w-full max-w-md bg-white rounded-xl shadow-xl dark:bg-gray-800 outline-none animate-fadeIn"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center dark:bg-red-900/30">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          </div>
          <Button onClick={onClose} variant={'ghost'} size={'icon'}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {itemName && <p className="font-medium text-gray-900 dark:text-white">{itemName}</p>}
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>

        <div className="flex items-center gap-3 p-4 border-t border-gray-200 dark:border-gray-600">
          <Button
            onClick={onClose}
            disabled={isLoading}
            variant={'outline'}
            className="flex-1 px-4 py-2 text-sm font-medium"
          >
            Bekor qilish
          </Button>

          <Button
            onClick={onConfirm}
            disabled={isLoading}
            variant={'destructive'}
            className="flex-1 px-4 py-2 text-sm font-medium"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">O&apos;chirilmoqda...</div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" />
                O&apos;chirish
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
