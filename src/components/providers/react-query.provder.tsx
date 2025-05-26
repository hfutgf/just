'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactElement } from 'react';

const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: { children: ReactElement }): ReactElement => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
