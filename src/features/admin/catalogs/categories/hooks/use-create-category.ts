import { useMutation } from '@tanstack/react-query';

import { CategoryFormType, CategoriesResponseType } from '../../types/category.types';

import { axiosAdminApi } from '@/api/interceptors';
import { errorResponse } from '@/utils/toasts';

export function useCreateCategory() {
  const {
    mutate: createCategory,
    isPending: isCategoryCreate,
    isSuccess,
    data: responseData,
  } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: async (body: CategoryFormType) => {
      try {
        const response = await axiosAdminApi.post<CategoriesResponseType>('/categories', body);
        return response.data;
      } catch (error) {
        errorResponse(error as Error);
      }
    },
  });

  return { createCategory, isCategoryCreate, isSuccess, responseData };
}
