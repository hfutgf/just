'use client';

import { Home, RefreshCw, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

const ErrorPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <AlertTriangle className="w-24 h-24 text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Xatolik yuz berdi</h1>
        </div>

        <div className="space-y-2">
          <p className="text-gray-600 max-w-md">
            Kechirasiz, kutilmagan xatolik yuz berdi. Iltimos qaytadan urinib ko&apos;ring.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => router.refresh()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Qayta yuklash
          </Button>

          <Button>
            <Link href={'/'} className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Bosh sahifa
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
