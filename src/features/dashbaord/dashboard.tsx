import React from 'react';

import { BannerResponse } from '../admin/banners/types';
import { CategoryResponseType } from '../types/category.types';

import Banner from './components/banner';
import Categories from './components/categories';

type DashboardPropsType = {
  banners: BannerResponse;
  categories: CategoryResponseType;
};

const Dashboard = ({ banners, categories }: DashboardPropsType) => {
  return (
    <div className="w-full">
      <Categories categories={categories} />
      <Banner banners={banners} />
    </div>
  );
};

export default Dashboard;
