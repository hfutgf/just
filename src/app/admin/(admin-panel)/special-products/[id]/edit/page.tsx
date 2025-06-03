import dynamic from 'next/dynamic';
import React from 'react';

const SpecialProductUpdate = dynamic(
  () => import('@/fetures/admin/special-products/update/special-product-update'),
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
  return <SpecialProductUpdate specialProductId={id} />;
};

export default SpecialProductUpdatePage;
