import { ReactElement } from 'react';

import AdminHeader from '@/fetures/admin/components/admin-header';
import AdminSidebar from '@/fetures/admin/components/admin-sidebar/admin-sidebar';

const AdminPanelLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <div className="flex relative">
        <AdminSidebar />

        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanelLayout;
