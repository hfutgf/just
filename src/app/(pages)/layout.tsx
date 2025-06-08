import React, { ReactElement, ReactNode } from 'react';

import Header from '@/components/shared/header';

const MainLayout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <div className="min-h-screen w-screen max-w-[1800px] bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />

      <main className="min-h-[calc(100vh-64px)] p-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-blue-200/25 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full relative z-10">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
