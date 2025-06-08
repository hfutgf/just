import { notFound } from 'next/navigation';
import React from 'react';

import { serverApiFetch } from '@/api/server-api';
import EditCategory from '@/features/admin/catalogs/categories/edit-category';
import { CategoryResponseType } from '@/features/types/category.types';

interface EditCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

const EditCategoryPage = async ({ params }: EditCategoryPageProps) => {
  try {
    const { id } = await params;
    const response = await serverApiFetch<CategoryResponseType>(`/categories/${id}`);
    const data = response.data;
    return <EditCategory category={data} />;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  } catch (error) {
    return notFound();
  }
};

export default EditCategoryPage;
