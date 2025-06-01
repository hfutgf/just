import { useQuery } from '@tanstack/react-query';

import { FetchSepcialProductsParamsType, ResponseSpecialProductsType } from '../types';

import { axiosAdminApi } from '@/api/interceptors';

export function useFetchSpecialProducts(params: FetchSepcialProductsParamsType) {
  const {
    data: products,
    isLoading: isFetchProducts,
    refetch: refetchSpecialProducts,
  } = useQuery({
    queryKey: ['special-products'],
    queryFn: async () => {
      const response = await axiosAdminApi.get<ResponseSpecialProductsType>('/specialproducts', {
        params: { ...params },
      });
      return response.data;
    },
  });

  return {
    products,
    isFetchProducts,
    refetchSpecialProducts,
  };
}
