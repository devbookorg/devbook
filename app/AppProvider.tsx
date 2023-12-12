'use client';

import Modal from '@/components/common/Modal';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Wrapper from './AppWrapper';
import { SessionProvider } from 'next-auth/react';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RecoilRoot>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Wrapper>
            <Modal />
            {children}
          </Wrapper>
        </React.Suspense>
      </RecoilRoot>
    </SessionProvider>
  );
}
