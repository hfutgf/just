'use client';

import { Home, Users, ShoppingCart, BarChart3, Settings } from 'lucide-react';
import React from 'react';

import AdminLogout from './admin-logout';

const AdminSidebar = () => {
  return (
    <aside className="w-64 relative bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)]">
      <div className="p-4">
        <div className="mb-8">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="font-semibold text-slate-800">Admin</span>
          </div>
        </div>

        <nav className="space-y-2">
          <div className="px-2 mb-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Asosiy
            </h3>
          </div>

          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium"
          >
            <Home className="w-5 h-5" />
            <span>Bosh sahifa</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <Users className="w-5 h-5" />
            <span>Foydalanuvchilar</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Buyurtmalar</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Tahlil</span>
          </a>

          <div className="px-2 mt-8 mb-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tizim</h3>
          </div>

          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Sozlamalar</span>
          </a>
        </nav>

        <AdminLogout />
      </div>
    </aside>
  );
};

export default AdminSidebar;
