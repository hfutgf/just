import React from 'react';

import SpecialProductUpdate from '@/fetures/admin/special-products/update/special-product-update';

const SpecialProductUpdatePage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  return <SpecialProductUpdate specialProductId={id} />;
};

export default SpecialProductUpdatePage;
