import React, { ReactElement, ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <div className="min-h-screen w-screen max-w-[1800px] flex items-center justify-center bg-gray-50">
      <div className="w-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
