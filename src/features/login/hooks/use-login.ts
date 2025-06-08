import { useMutation } from '@tanstack/react-query';

import { LoginFormType, LoginResponseType } from '../types';

import { axiosDefault } from '@/api/interceptors';

export default function useLogin() {
  const {
    mutate: login,
    isPending: isLoginPending,
    data: loginData,
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (body: LoginFormType) => {
      const response = await axiosDefault.post<LoginResponseType>(
        '/auth/telegram/verify-code',
        body
      );
      return response.data;
    },
  });

  return {
    login,
    isLoginPending,
    loginData,
  };
}
