import { notFound } from 'next/navigation';

import { serverApiFetch } from '@/api/server-api';
import { ResponseSpecialProductType } from '@/features/admin/special-products/types';
import SpecialProductView from '@/features/admin/special-products/view/SpecialProductView';

interface SpecialProductUpdatePageProps {
  params: Promise<{
    id: string;
  }>;
}

const fetchSpecialProduct = async (id: string) => {
  try {
    const response = await serverApiFetch<ResponseSpecialProductType>(`/specialproducts/${id}`);
    if (!response.success) throw new Error('Failed to fetch special product ' + response.message);
    return response;
  } catch (error) {
    const e = error as Error;
    throw new Error('Failed to fetch special product ' + e.message);
  }
};

const SpecialProductPage = async ({ params }: SpecialProductUpdatePageProps) => {
  const { id } = await params;

  try {
    const response = await fetchSpecialProduct(id);
    return <SpecialProductView specialProduct={response.data} />;
    // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {
    return notFound();
  }
};

export default SpecialProductPage;
