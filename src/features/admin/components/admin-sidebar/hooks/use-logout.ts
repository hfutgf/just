import { useMutation } from '@tanstack/react-query';

import { axiosAdminApi } from '@/api/interceptors';

export const useLogout = () => {
  const {
    mutate: logout,
    isPending: isLogoutPending,
    data: logoutData,
  } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const response = await axiosAdminApi.post('/admin/auth/logout');
      return response.data;
    },
  });

  return {
    logout,
    isLogoutPending,
    logoutData,
  };
};
