import { useMutation } from '@tanstack/react-query';

import { BannerResponse } from '../types';

import { axiosAdminApi } from '@/api/interceptors';

export function useCreateBanner() {
  const {
    mutate: createBanner,
    isPending: isCreateBanner,
    isSuccess: isCreateBannerSuccess,
  } = useMutation({
    mutationKey: ['create-banner'],
    mutationFn: async (body: FormData) => {
      const response = await axiosAdminApi.post<BannerResponse>('/banners', body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
  });

  return {
    createBanner,
    isCreateBanner,
    isCreateBannerSuccess,
  };
}
