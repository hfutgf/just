import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import z from 'zod';

import { GroupResponseType } from '../../types/group.types';
import { createGroupSchema } from '../schemas/create-group.schema';

import { axiosAdminApi } from '@/api/interceptors';
import { errorResponse } from '@/utils/toasts';

export function useCreateGroup() {
  const {
    mutate: createGroup,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
  } = useMutation({
    mutationKey: ['create-sub-category'],
    mutationFn: async (body: z.infer<typeof createGroupSchema>) => {
      try {
        const response = await axiosAdminApi.post<GroupResponseType>('/groups', body);
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
    createGroup,
    isCreatePending,
    isCreateSuccess,
  };
}
