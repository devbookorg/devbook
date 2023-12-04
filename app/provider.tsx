'use client';

import Modal from '@/components/common/Modal';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { RecoilRoot } from 'recoil';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RecoilRoot>
        <React.Suspense fallback={<div>Loading...</div>}>
          {/* <Modal /> */}
          {children}
        </React.Suspense>
      </RecoilRoot>
    </SessionProvider>
  );
}
