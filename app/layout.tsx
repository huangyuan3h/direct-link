import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const san = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '北径咨询 - 北美直连项目',
  description: '帮你选择加拿大移民项目和机构',
  applicationName: '北美直连',
  authors: { name: 'Yuan Huang', url: 'https://github.com/huangyuan3h' },
  keywords: ['加拿大', '移民'],
  viewport: { width: 'device-width', initialScale: 1 },
  icons: [
    { url: '/favicon.ico' },
    { url: '/apple-touch-icon.png', rel: 'apple-touch-icon', sizes: '180x180' },
    {
      url: '/favicon-32x32.png',
      rel: 'icon',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      url: '/favicon-16x16.png',
      rel: 'icon',
      sizes: '16x16',
      type: 'image/png',
    },
  ],
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={san.className}>{children}</body>
    </html>
  );
}
