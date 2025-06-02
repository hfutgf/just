import { Upload, X } from 'lucide-react';
import React, { ChangeEvent } from 'react';

import { Button } from './button';

type Props = {
  onChange: (files: File[]) => void;
  value?: File[];
};

const InputPhotosUpload = ({ onChange, value = [] }: Props) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      onChange([...value, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
      <div className="text-center">
        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
        <div className="space-y-2">
          <Button type="button" variant="outline" asChild>
            <label htmlFor="images" className="cursor-pointer">
              Rasm yuklash
              <input
                onChange={handleFileChange}
                id="images"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
              />
            </label>
          </Button>
          <p className="text-sm text-gray-500">PNG, JPG, GIF (max 5MB)</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {value.map((file, index) => (
          <div key={index} className="relative group">
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-full h-24 object-cover rounded-lg border"
            />
            <Button
              type="button"
              size="sm"
              variant="destructive"
              className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeFile(index)}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputPhotosUpload;
