'use client';

import { Home, Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <div className="flex justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">Sahifa topilmadi</h2>
          <p className="text-gray-600 max-w-md">
            Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko&apos;chirilgan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Orqaga qaytish
          </Button>

          <Button>
            <Link className="flex items-center gap-2" href={'/'}>
              <Home className="w-4 h-4" />
              Bosh sahifa
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
