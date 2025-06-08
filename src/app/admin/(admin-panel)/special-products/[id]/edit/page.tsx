import React from 'react';

import EditSpecialProduct from '@/features/admin/special-products/edit/edit-special-product';

interface SpecialProductUpdatePageProps {
  params: Promise<{
    id: string;
  }>;
}

const SpecialProductUpdatePage = async ({ params }: SpecialProductUpdatePageProps) => {
  const { id } = await params;
  return <EditSpecialProduct specialProductId={id} />;
};

export default SpecialProductUpdatePage;
