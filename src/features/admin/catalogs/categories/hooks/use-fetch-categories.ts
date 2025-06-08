import { useQuery } from '@tanstack/react-query';

import { axiosDefault } from '@/api/interceptors';
import { CategoriesResponseType } from '@/features/types/category.types';

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
