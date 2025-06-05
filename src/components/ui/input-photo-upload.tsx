import { Upload, X } from 'lucide-react';
import React, { ChangeEvent, useMemo } from 'react';

import { Button } from './button';

type Props = {
  onChange: (file: File | null) => void;
  value?: File | null;
  maxSizeMB?: number;
};

const InputPhotoUpload = ({ onChange, value = null, maxSizeMB = 5 }: Props) => {
  const previewUrl = useMemo(() => {
    if (!value) return null;
    return URL.createObjectURL(value);
  }, [value]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`Fayl hajmi juda katta. Maksimal ruxsat etilgan hajm: ${maxSizeMB}MB`);
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Iltimos, rasm yuklang');
        return;
      }

      onChange(file);
    }
  };

  const removeFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    onChange(null);
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
      <div className="text-center">
        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
        <div className="space-y-2">
          <Button type="button" variant="outline" asChild disabled={!!value}>
            <label htmlFor="image-upload" className="cursor-pointer">
              {value ? 'Rasm yuklandi' : 'Rasm yuklash'}
              <input
                onChange={handleFileChange}
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                disabled={!!value}
              />
            </label>
          </Button>
          <p className="text-sm text-gray-500">PNG, JPG, GIF (maks. {maxSizeMB}MB)</p>
        </div>
      </div>

      {previewUrl && (
        <div className="mt-4 flex justify-center">
          <div className="relative group max-w-xs">
            <img
              src={previewUrl}
              alt="Oldindan ko‘rish"
              className="w-full h-48 object-contain rounded-lg border"
            />
            <Button
              type="button"
              size="sm"
              variant="destructive"
              className="absolute top-1 right-1 h-8 w-8 p-0 rounded-full"
              onClick={removeFile}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputPhotoUpload;
