'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useUpdateSpecialProduct } from '../hooks/use-update-special-product';

import UpdateForm from './edit-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EditSpecialProduct = ({ specialProductId }: { specialProductId: string }) => {
  const { isSuccess, isUpdateSpecialProduct, update } = useUpdateSpecialProduct(specialProductId);
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Maxsus mahsulot muvaffaqiyatli o'zgartirildi!`);
      router.push('/admin/special-products');
    }
  }, [isSuccess, router]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Maxsus mahsulotni o&apos;zgartirish
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateForm
            isUpdateSpecialProduct={isUpdateSpecialProduct}
            updateProduct={update}
            specialProductId={specialProductId}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditSpecialProduct;
