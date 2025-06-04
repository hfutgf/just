import dynamic from 'next/dynamic';
import React from 'react';

const CreateSpecialProduct = dynamic(
  () => import('@/fetures/admin/special-products/create/create-special-product'),
  {
    ssr: Boolean(false),
  }
);

const CreateSpecialProductPage = () => {
  return <CreateSpecialProduct />;
};

export default CreateSpecialProductPage;
