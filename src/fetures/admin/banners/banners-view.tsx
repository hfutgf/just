'use client';

import React from 'react';

import { useFetchBanners } from './hooks/use-fetch-banners';

import Loading from '@/components/shared/loading';
import NoDataExamples from '@/components/shared/no-data';

const BannersView = () => {
  const { banners, isFetchingBanners } = useFetchBanners();

  if (isFetchingBanners) {
    return <Loading />;
  }

  if (banners?.data?.length === 0) {
    return <NoDataExamples />;
  }

  return <section className="w-full mx-auto">hello world</section>;
};

export default BannersView;
