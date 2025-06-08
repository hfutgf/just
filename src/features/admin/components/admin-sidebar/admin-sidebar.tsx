'use client';

import {
  CopyPlus,
  Grid,
  Grid2x2Plus,
  Hammer,
  ImagePlus,
  Images,
  LayoutList,
  ListChecks,
  ListPlus,
  Sofa,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import AdminLogout from './admin-logout';

import { cn } from '@/lib/utils';

const paths = [
  [
    { path: '/admin/special-products', icon: <Sofa className="size-5" />, label: 'Mahsulotlar' },
    {
      path: '/admin/special-products/create',
      icon: <Hammer className="size-5" />,
      label: `Qo'shish`,
    },
  ],
  [
    { path: '/admin/banners', icon: <Images className="size-5" />, label: 'Bannerlar' },
    {
      path: '/admin/banners/create',
      icon: <ImagePlus className="size-5" />,
      label: `Banner qo'shish`,
    },
  ],
  [
    { path: '/admin/categories', icon: <Grid className="size-5" />, label: 'Kategoriyalar' },
    {
      path: '/admin/categories/create',
      icon: <Grid2x2Plus className="size-5" />,
      label: `Kategoriya qo'shish`,
    },

    {
      path: '/admin/subcategories',
      icon: <LayoutList className="size-5" />,
      label: 'Pastki kategoriya',
    },
    {
      path: '/admin/subcategories/create',
      icon: <CopyPlus className="size-5" />,
      label: `Pastki kategoriya qo'shish`,
    },
    {
      path: '/admin/groups',
      icon: <ListChecks className="size-5" />,
      label: `Gruppa`,
    },
    {
      path: '/admin/groups/create',
      icon: <ListPlus className="size-5" />,
      label: `Gruppa qo'shish`,
    },
  ],
];

const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 relative bg-white border-r border-slate-200 max-h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] overflow-y-scroll ">
      <div className="p-4 flex flex-col justify-between gap-6">
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
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

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
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="px-2 mt-6 mb-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Katalog
            </h3>
          </div>

          {paths[2].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors',
                pathname === item.path && 'bg-blue-50 text-blue-700 font-medium'
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <AdminLogout />
      </div>
    </aside>
  );
};

export default AdminSidebar;
