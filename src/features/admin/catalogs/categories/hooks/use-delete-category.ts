import { useMutation } from '@tanstack/react-query';

import { axiosAdminApi } from '@/api/interceptors';
import { CategoriesResponseType } from '@/features/types/category.types';
import { errorResponse } from '@/utils/toasts';

export function useDeleteCategory() {
  const {
    mutate: deleteCategory,
    isPending: isDeleteCategoryLoading,
    isSuccess: isDeleteCategorySuccess,
  } = useMutation({
    mutationKey: ['delete-category'],
    mutationFn: async (categoryId: string) => {
      try {
        const response = await axiosAdminApi.delete<CategoriesResponseType>(
          `/categories/${categoryId}`
        );
        return response.data;
      } catch (error) {
        errorResponse(error as Error);
      }
    },
  });

  return {
    deleteCategory,
    isDeleteCategoryLoading,
    isDeleteCategorySuccess,
  };
}
