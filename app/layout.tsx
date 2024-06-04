import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.scss';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from '@/components/user-context';
import GoogleAnalytics from '@/components/google-analytics';

const san = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '北径信息 - 加拿大华人社区',
  description: '加拿大华人信息平台',
  applicationName: '北径信息',
  authors: { name: 'Yuan Huang', url: 'https://github.com/huangyuan3h' },
  keywords: ['加拿大', '加拿大华人', '移民加拿大'],
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
      <body className={san.className}>
        <UserProvider>{children}</UserProvider>
        <ToastContainer />
        <GoogleAnalytics
          trackingId={`${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />
      </body>
    </html>
  );
}
