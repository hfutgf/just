import { useQuery } from '@tanstack/react-query';

import { BannerResponse } from '../types';

import { axiosDefault } from '@/api/interceptors';

export function useFetchBanners() {
  const { data: banners, isPending: isFetchingBanners } = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const response = await axiosDefault<BannerResponse>('/banners');
      return response.data;
    },
  });

  return { banners, isFetchingBanners };
}
