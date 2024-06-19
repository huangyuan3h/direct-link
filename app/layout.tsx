import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.scss';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from '@/components/user-context';
import GoogleAnalytics from '@/components/google-analytics';
import { DOMAIN_URL } from '@/config/domain';

const san = Open_Sans({ subsets: ['latin'] });

const title = 'North Path - 北美新移民综合信息平台 | 北径信息';
const description =
  'North Path - 专为北美新移民打造的综合平台，提供最新生活信息、实用经验分享和互助交流。探索如何在北美顺利安家，工作，和融入社区。';

export const metadata: Metadata = {
  title,
  description,
  applicationName: '北径信息',
  authors: { name: 'Yuan Huang', url: 'https://github.com/huangyuan3h' },
  keywords: [
    '北美华人社区',
    '加拿大移民',
    '加拿大华人',
    '移民指南',
    '留学加拿大',
    '移民生活',
    '新移民互助',
    '加拿大生活信息',
    '加拿大经验分享',
    '北径信息',
  ],
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
  openGraph: {
    title,
    description,
    url: DOMAIN_URL,
    type: 'website',
    images: ['/opengraph.png'],
  },
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
