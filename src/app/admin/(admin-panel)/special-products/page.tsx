import dynamic from 'next/dynamic';
import React from 'react';

// import SpecialProducts from '@/fetures/admin/special-products/special-products';

const SpecialProducts = dynamic(() => import('@/fetures/admin/special-products/special-products'), {
  ssr: Boolean(false),
});

const SpecialProductsPage = () => {
  return <SpecialProducts />;
};

export default SpecialProductsPage;
