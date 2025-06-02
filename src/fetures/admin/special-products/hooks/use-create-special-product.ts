import { useMutation } from '@tanstack/react-query';

import { ResponseSpecialProductType } from '../types';

import { axiosAdminApi } from '@/api/interceptors';

export function useCreateSpecialProduct() {
  const {
    mutate: createProduct,
    isPending: isCreateSpecialProduct,
    isSuccess,
  } = useMutation({
    mutationKey: ['special-product-create'],
    mutationFn: async (body: FormData) => {
      const response = await axiosAdminApi.post<ResponseSpecialProductType>(
        '/specialproducts',
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
    createProduct,
    isCreateSpecialProduct,
    isSuccess,
  };
}
