import { useMutation } from '@tanstack/react-query';

import { UpdateSpecialProductFormType } from '../schemas/update-special-product.schema';
import { ResponseSpecialProductType } from '../types';

import { axiosAdminApi } from '@/api/interceptors';

export function useUpdateSpecialProduct(specialProductId: string) {
  const {
    mutate: update,
    isPending: isUpdateSpecialProduct,
    isSuccess,
  } = useMutation({
    mutationKey: ['special-product-update', specialProductId],
    mutationFn: async (body: Partial<UpdateSpecialProductFormType>) => {
      const response = await axiosAdminApi.patch<ResponseSpecialProductType>(
        `/specialproducts/${specialProductId}`,
        body
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
