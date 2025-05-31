import { useQuery } from '@tanstack/react-query';

import { ResponseSpecialProductsType } from '../types';

import { axiosAdminApi } from '@/api/interceptors';

export function useFetchSpecialProducts() {
  const { data: products, isLoading: isFetchProducts } = useQuery({
    queryKey: ['special-products'],
    queryFn: async () => {
      const response = await axiosAdminApi.get<ResponseSpecialProductsType>('/specialproducts');
      return response.data;
    },
  });

  return {
    products,
    isFetchProducts,
  };
}
