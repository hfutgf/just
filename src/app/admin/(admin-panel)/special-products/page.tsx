import dynamic from 'next/dynamic';
import React from 'react';

// import SpecialProducts from '@/features/admin/special-products/special-products';

const SpecialProducts = dynamic(
  () => import('@/features/admin/special-products/special-products'),
  {
    ssr: Boolean(false),
  }
);

const SpecialProductsPage = () => {
  return <SpecialProducts />;
};

export default SpecialProductsPage;
