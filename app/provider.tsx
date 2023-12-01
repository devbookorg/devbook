'use client';

import Modal from '@/components/common/Modal';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RecoilRoot>
        <Modal />
        {children}
      </RecoilRoot>
    </SessionProvider>
  );
}
