'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { useCreateSpecialProduct } from '../hooks/use-create-special-product';

import SpecialProductForm from './form';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SpecialProductCreate = () => {
  const { isCreateSpecialProduct, createProduct, isSuccess } = useCreateSpecialProduct();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push('/admin/special-products');
    }
  }, [isSuccess, router]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Maxsus mahsulot yaratish
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SpecialProductForm
            isCreateSpecialProduct={isCreateSpecialProduct}
            createProduct={createProduct}
            isCreateSuccess={isSuccess}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SpecialProductCreate;
