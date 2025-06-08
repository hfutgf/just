import { useQuery } from '@tanstack/react-query';

import { axiosDefault } from '@/api/interceptors';
import { BannerResponse } from '@/features/admin/banners/types';

export function useFetchBanners() {
  const { data: banners, isLoading: isBannerLoading } = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const response = await axiosDefault<BannerResponse>('/banners');
      return response.data;
    },
  });

  return {
    banners,
    isBannerLoading,
  };
}
