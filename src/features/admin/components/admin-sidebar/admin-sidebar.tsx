'use client';

import { Hammer, ImagePlus, Images, Sofa } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import AdminLogout from './admin-logout';

import { cn } from '@/lib/utils';

const paths = [
  [
    { path: '/admin/special-products', icon: Sofa, label: 'Mahsulotlar' },
    { path: '/admin/special-products/create', icon: Hammer, label: `Qo'shish` },
  ],
  [
    { path: '/admin/banners', icon: Images, label: 'Bannerlar' },
    { path: '/admin/banners/create', icon: ImagePlus, label: `Banner qo'shish` },
  ],
];

const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 relative bg-white border-r border-slate-200 max-h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)]">
      <div className="p-4">
        <nav className="space-y-2">
          <div className="px-2 mb-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Maxsus mahsulotlar
            </h3>
          </div>

          {paths[0].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors',
                pathname === item.path && 'bg-blue-50 text-blue-700 font-medium'
              )}
            >
              <item.icon className={'w-5 h-5'} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="px-2 mt-6 mb-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Bannerlar
          </h3>
        </div>

        {paths[1].map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              'flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors',
              pathname === item.path && 'bg-blue-50 text-blue-700 font-medium'
            )}
          >
            <item.icon className={'w-5 h-5'} />
            <span>{item.label}</span>
          </Link>
        ))}

        <AdminLogout />
      </div>
    </aside>
  );
};

export default AdminSidebar;
