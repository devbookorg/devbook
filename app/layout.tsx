import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { Providers } from './provider';

const notoSans = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevBook',
  description: 'DevBook',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko-KR">
      <body className={notoSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
