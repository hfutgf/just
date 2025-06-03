import dynamic from 'next/dynamic';
import React from 'react';

const SpecialProductCreate = dynamic(
  () => import('@/fetures/admin/special-products/create/special-product-create'),
  {
    ssr: Boolean(false),
  }
);

const CreateSpecialProductPage = () => {
  return <SpecialProductCreate />;
};

export default CreateSpecialProductPage;
