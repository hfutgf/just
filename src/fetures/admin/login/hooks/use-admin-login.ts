import { useMutation } from '@tanstack/react-query';

import { LoginForm, LoginResponse } from '../types';

import { axiosDefault } from '@/api/interceptors';

export function useAdminLogin() {
  const {
    mutate: adminLoginMutation,
    isPending: isAdminLoginPending,
    data: adminLoginData,
  } = useMutation({
    mutationKey: ['adminLogin'],
    mutationFn: async (body: LoginForm) => {
      const response = await axiosDefault.post<LoginResponse>('/admin/auth/login', body);
      return response.data;
    },
  });

  return {
    adminLoginData,
    isAdminLoginPending,
    adminLoginMutation,
  };
}
