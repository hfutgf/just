import { useQuery } from '@tanstack/react-query';

import { CategoryResponseType } from '../types/category.types';

import { axiosDefault } from '@/api/interceptors';

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
