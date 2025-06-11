import { useMutation } from '@tanstack/react-query';
import z from 'zod';

import { createSubCategorySchema } from '../schemas/create-sub-category.schema';

import { axiosAdminApi } from '@/api/interceptors';

export function useCreateSubCategory() {
  const {
    mutate: createSubCategory,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
  } = useMutation({
    mutationKey: ['create-sub-category'],
    mutationFn: async (body: z.infer<typeof createSubCategorySchema>) => {
      const response = await axiosAdminApi.post('/subcategories', body);
      return response.data;
    },
  });

  return {
    createSubCategory,
    isCreatePending,
    isCreateSuccess,
  };
}
