'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { useFetchSpecialProduct } from '../hooks/use-fetch-special-product';
import { useUpdateSpecialProduct } from '../hooks/use-update-special-product';

import SpecialProductForm from './form';

import Loading from '@/components/shared/loading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SpecialProductUpdate = ({ specialProductId }: { specialProductId: string }) => {
  const router = useRouter();
  const { isFetchProduct, specialProduct } = useFetchSpecialProduct(specialProductId);
  const { update, isSuccess, isUpdateSpecialProduct } = useUpdateSpecialProduct(specialProductId);

  useEffect(() => {
    if (isSuccess) {
      router.push('/admin/special-products');
    }
  });

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
          {isFetchProduct && <Loading />}
          {!isFetchProduct && specialProduct && (
            <SpecialProductForm
              specialProduct={specialProduct}
              isUpdateSpecialProduct={isUpdateSpecialProduct}
              update={update}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SpecialProductUpdate;
