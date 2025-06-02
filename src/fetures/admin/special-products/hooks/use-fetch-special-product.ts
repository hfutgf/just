import { useQuery } from '@tanstack/react-query';

import { ResponseSpecialProductType } from '../types';

import { axiosDefault } from '@/api/interceptors';

export function useFetchSpecialProduct(specialProductId: string) {
  const { data: specialProduct, isLoading: isFetchProduct } = useQuery({
    queryKey: ['special-product', specialProductId],
    queryFn: async () => {
      const response = await axiosDefault.get<ResponseSpecialProductType>(
        `/specialproducts/${specialProductId}`
      );
      return response.data;
    },
    enabled: !!specialProductId,
  });

  return {
    specialProduct,
    isFetchProduct,
  };
}
