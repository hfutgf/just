import { Menu, User } from 'lucide-react';
import React from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const AdminHeader = () => {
  return (
    <header className="bg-white border-b border-slate-200 h-16 px-6">
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors lg:hidden">
            <Menu className="w-5 h-5 text-slate-600" />
          </button>

          <h1 className="text-xl font-semibold text-slate-800">Admin panel</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-slate-700">Admin</div>
              <div className="text-xs text-slate-500">admin@example.com</div>
            </div>
            <button className="flex items-center space-x-2 p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-500 text-white">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
