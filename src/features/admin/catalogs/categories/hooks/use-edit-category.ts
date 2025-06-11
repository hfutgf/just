import { useMutation } from '@tanstack/react-query';

import { CategoryFormType, CategoriesResponseType } from '../../types/category.types';

import { axiosAdminApi } from '@/api/interceptors';
import { errorResponse } from '@/utils/toasts';

export function useEditCategory() {
  const {
    mutate: editCategory,
    isPending: isEditCategory,
    isSuccess,
    data: responseData,
  } = useMutation({
    mutationKey: ['update-category'],
    mutationFn: async ({
      categoryId,
      body,
    }: {
      categoryId: string;
      body: Partial<CategoryFormType>;
    }) => {
      try {
        const response = await axiosAdminApi.patch<CategoriesResponseType>(
          `/categories/${categoryId}`,
          body
        );
        return response.data;
      } catch (error) {
        errorResponse(error as Error);
      }
    },
  });

  return { editCategory, isEditCategory, isSuccess, responseData };
}
