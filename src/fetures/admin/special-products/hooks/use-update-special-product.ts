import { useMutation } from '@tanstack/react-query';

import { ResponseSpecialProductType } from '../types';

import { axiosAdminApi } from '@/api/interceptors';

export function useUpdateSpecialProduct(specialProductId: string) {
  const {
    mutate: update,
    isPending: isUpdateSpecialProduct,
    isSuccess,
  } = useMutation({
    mutationKey: ['special-product-update'],
    mutationFn: async (body: FormData) => {
      const response = await axiosAdminApi.patch<ResponseSpecialProductType>(
        `/specialproducts/${specialProductId}`,
        body,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    },
  });

  return {
    update,
    isUpdateSpecialProduct,
    isSuccess,
  };
}
