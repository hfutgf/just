import { useQuery } from '@tanstack/react-query';

import { CategoriesResponseType } from '../../types/category.types';

import { axiosDefault } from '@/api/interceptors';

export const useFetchCategories = () => {
  const {
    data: categories,
    isLoading: isFetchCategory,
    refetch,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axiosDefault<CategoriesResponseType>('categories');
      return response.data;
    },
  });

  return { categories, isFetchCategory, refetch };
};
