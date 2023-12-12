import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { AppProviders } from './AppProvider';
import AppLayout from '@/components/common/layout/AppLayout';

const notoSans = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevBook',
  description: 'DevBook',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko-KR">
      <body className={notoSans.className}>
        <AppProviders>
          <AppLayout>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  );
}
