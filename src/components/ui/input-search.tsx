import { Search } from 'lucide-react';
import React, { ChangeEvent } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  value: string;
  onChange: (searchTerm: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

const InputSearch = ({
  onChange,
  value,
  className,
  disabled = false,
  placeholder = 'Mahsulotlarni qidirish...',
}: Props) => {
  return (
    <div className="relative">
      <Search
        className={cn(
          'absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400',
          className
        )}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default InputSearch;
