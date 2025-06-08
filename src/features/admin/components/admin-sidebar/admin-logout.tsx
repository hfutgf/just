'use client';

import { LogOut } from 'lucide-react';
import React, { useEffect } from 'react';

import { useLogout } from './hooks/use-logout';

import { Button } from '@/components/ui/button';

const AdminLogout = () => {
  const { isLogoutPending, logout, logoutData } = useLogout();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (logoutData?.success) {
      window.location.href = '/admin/login';
      localStorage.removeItem('admin-storage');
    }
  }, [logoutData]);

  return (
    <div className="absolute bottom-4 left-4 right-4">
      <Button
        disabled={isLogoutPending}
        onClick={handleLogout}
        variant="ghost"
        className="hover:bg-red-50 hover:text-red-600 cursor-pointer flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 transition-colors w-full"
      >
        <LogOut className="w-5 h-5" />
        <span>Chiqish</span>
      </Button>
    </div>
  );
};

export default AdminLogout;
