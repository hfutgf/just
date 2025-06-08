import { useMutation } from '@tanstack/react-query';

import { LoginAdminForm, LoginAdminResponse } from '../types';

import { axiosDefault } from '@/api/interceptors';

export function useAdminLogin() {
  const {
    mutate: adminLoginMutation,
    isPending: isAdminLoginPending,
    data: adminLoginData,
  } = useMutation({
    mutationKey: ['adminLogin'],
    mutationFn: async (body: LoginAdminForm) => {
      const response = await axiosDefault.post<LoginAdminResponse>('/admin/auth/login', body);
      return response.data;
    },
  });

  return {
    adminLoginData,
    isAdminLoginPending,
    adminLoginMutation,
  };
}
