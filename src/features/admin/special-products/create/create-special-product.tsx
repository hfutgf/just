'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useCreateSpecialProduct } from '../hooks/use-create-special-product';

import CreateForm from './create-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CreateSpecialProduct = () => {
  const { isCreateSpecialProduct, createProduct, isSuccess } = useCreateSpecialProduct();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Maxsus mahsulot muvaffaqiyatli yaratildi!');
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
          <CreateForm
            isCreateSpecialProduct={isCreateSpecialProduct}
            createProduct={createProduct}
            isCreateSuccess={isSuccess}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateSpecialProduct;
