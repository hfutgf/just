import { Loader2 } from 'lucide-react';
import React from 'react';

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-medium text-gray-800">Yuklanmoqda...</h2>
          <p className="text-gray-600">Iltimos biroz kuting</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
