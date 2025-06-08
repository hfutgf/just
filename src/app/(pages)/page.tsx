import { notFound } from 'next/navigation';

import { serverApiFetch } from '@/api/server-api';
import { BannerResponse } from '@/fetures/admin/banners/types';
import Dashboard from '@/fetures/dashbaord/dashboard';
import { CategoryResponseType } from '@/fetures/types/category.types';

const Page = async () => {
  try {
    const banners = serverApiFetch('/banners');
    const categories = serverApiFetch('/categories');

    const [bannersResponse, categoriesResponse] = await Promise.all([banners, categories]);

    return (
      <Dashboard
        banners={bannersResponse as BannerResponse}
        categories={categoriesResponse as CategoryResponseType}
      />
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  } catch (error) {
    return notFound();
  }
};

export default Page;
