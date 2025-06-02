import { Loader2 } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

type Size = 'sm' | 'md' | 'lg' | 'xl';

interface LoadingProps {
  size?: Size;
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text = 'Yuklanmoqda...',
  fullScreen = false,
}) => {
  const sizeClasses: Record<Size, string> = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center space-y-3">
          <Loader2 className={cn('text-blue-500 animate-spin mx-auto', sizeClasses[size])} />
          {text && <p className="text-gray-600 text-sm">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <Loader2 className={cn('text-blue-500 animate-spin', sizeClasses[size])} />
      {text && <span className="text-gray-600 text-sm">{text}</span>}
    </div>
  );
};

export default Loading;
