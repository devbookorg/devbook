import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { AppProviders } from './AppProvider';
import AppLayout from '@/components/common/layout/AppLayout';

const notoSans = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  manifest: './manifest.json',
  title: 'DevBook',
  description: 'DevBook',
  icons: {
    other: [
      {
        url: '../assets/favicons/icon-512x512.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#31854C',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko-KR">
      <link rel="manifest" href="/manifest.json" />
      <body className={notoSans.className}>
        <AppProviders>
          <AppLayout>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  );
}
