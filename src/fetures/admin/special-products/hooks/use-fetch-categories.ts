import { useQuery } from '@tanstack/react-query';

import { axiosDefault } from '@/api/interceptors';
import { CategoryResponseType } from '@/fetures/types/category.types';

export const useFetchCategories = () => {
  const { data: categories, isLoading: isFetchCategory } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axiosDefault<CategoryResponseType>('categories');
      return response.data;
    },
  });

  return { categories, isFetchCategory };
};
