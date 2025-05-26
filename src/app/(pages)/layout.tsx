import React, { ReactElement, ReactNode } from 'react';

import Header from '@/components/shared/header';

const MainLayout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />

      {/* Main Content */}
      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 relative">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-blue-200/25 rounded-full blur-3xl"></div>
        </div>

        {/* Content Container */}
        <div className="w-full max-w-md relative z-10">{children}</div>
      </main>

      {/* Background Pattern */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default MainLayout;
