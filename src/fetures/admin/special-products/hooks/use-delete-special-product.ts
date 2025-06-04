import { useMutation } from '@tanstack/react-query';

import { ResponseSpecialProductType } from '../types';

import { axiosAdminApi } from '@/api/interceptors';

export function useDeleteSpecialProduct() {
  const {
    mutate: deleteProduct,
    isPending: isDeleteProductPending,
    isSuccess: isDeleteProductSuccess,
  } = useMutation({
    mutationKey: ['special-product-delete'],
    mutationFn: async (specialProductId: string) => {
      const response = await axiosAdminApi.delete<ResponseSpecialProductType>(
        `/specialproducts/${specialProductId}`
      );
      return response.data;
    },
  });

  return {
    deleteProduct,
    isDeleteProductPending,
    isDeleteProductSuccess,
  };
}
