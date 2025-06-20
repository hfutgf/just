import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import z from 'zod';

import { SubCategoriesResponseType } from '../../types/sub-cateogry.type';
import { createSubCategorySchema } from '../schemas/create-sub-category.schema';

import { axiosAdminApi } from '@/api/interceptors';
import { errorResponse } from '@/utils/toasts';

export function useCreateSubCategory() {
  const {
    mutate: createSubCategory,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
  } = useMutation({
    mutationKey: ['create-sub-category'],
    mutationFn: async (body: z.infer<typeof createSubCategorySchema>) => {
      try {
        const response = await axiosAdminApi.post<SubCategoriesResponseType>(
          '/subcategories',
          body
        );
        if (!response.data.success) {
          toast.error(response.data.message);
        }
        return response.data;
      } catch (error) {
        errorResponse(error as Error);
      }
    },
  });

  return {
    createSubCategory,
    isCreatePending,
    isCreateSuccess,
  };
}
