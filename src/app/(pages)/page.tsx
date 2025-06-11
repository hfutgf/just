import { notFound } from 'next/navigation';

import { serverApiFetch } from '@/api/server-api';
import { BannerResponse } from '@/features/admin/banners/types';
import { CategoriesResponseType } from '@/features/admin/catalogs/types/category.types';
import Dashboard from '@/features/dashbaord/dashboard';

const Page = async () => {
  try {
    const banners = serverApiFetch('/banners');
    const categories = serverApiFetch('/categories');

    const [bannersResponse, categoriesResponse] = await Promise.all([banners, categories]);

    return (
      <Dashboard
        banners={bannersResponse as BannerResponse}
        categories={categoriesResponse as CategoriesResponseType}
      />
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  } catch (error) {
    return notFound();
  }
};

export default Page;
