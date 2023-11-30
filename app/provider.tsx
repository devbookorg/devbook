'use client';
import Layout from '@/components/common/layout/Layout';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RecoilRoot>
        <Layout>{children}</Layout>
      </RecoilRoot>
    </SessionProvider>
  );
}
