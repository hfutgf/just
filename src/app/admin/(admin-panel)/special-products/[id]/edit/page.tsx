import dynamic from 'next/dynamic';
import React from 'react';

const EditSpecialProduct = dynamic(
  () => import('@/fetures/admin/special-products/edit/edit-special-product'),
  {
    ssr: Boolean(false),
  }
);
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
