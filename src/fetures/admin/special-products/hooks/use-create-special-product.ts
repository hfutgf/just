import { useMutation } from '@tanstack/react-query';

import { SpecialProductFormType } from '../schemas/special-product.schema';
import { ResponseSpecialProductType } from '../types';

import { axiosAdminApi } from '@/api/interceptors';

export function useCreateSpecialProduct() {
  const {
    mutate: createProduct,
    isPending: isCreateSpecialProduct,
    isSuccess,
  } = useMutation({
    mutationKey: ['special-product-create'],
    mutationFn: async (body: SpecialProductFormType) => {
      const response = await axiosAdminApi.post<ResponseSpecialProductType>(
        '/specialproducts',
        body
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
