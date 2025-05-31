import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LoginAdminResponse } from '@/fetures/admin/login/types';

export type AdminType = LoginAdminResponse['admin'];

type AdminStore = {
  admin: AdminType | null;
  login: (user: AdminType) => void;
  logout: () => void;
};

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      admin: null,

      login: (admin) =>
        set({
          admin,
        }),

      logout: () =>
        set({
          admin: null,
        }),
    }),
    {
      name: 'admin-storage',
      partialize: (state) => ({ admin: state.admin }),
    }
  )
);
