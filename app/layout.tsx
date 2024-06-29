import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.scss';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from '@/components/user-context';
import GoogleAnalytics from '@/components/google-analytics';
import { DOMAIN_URL } from '@/config/domain';

const san = Open_Sans({ subsets: ['latin'] });

const title = '北径移民资讯 - 加拿大新移民综合平台 | 移民、留学、住房、就业';
const description =
  '北径移民资讯 - 为加拿大新移民提供全方位信息，涵盖移民流程、留学指南、住房市场、汽车购买、就业机会、新闻动态和旅游建议，帮助新移民融入加拿大生活。';

export const metadata: Metadata = {
  title,
  description,
  applicationName: '北径信息',
  authors: { name: 'Yuan Huang', url: 'https://github.com/huangyuan3h' },
  keywords: [
    '加拿大新移民',
    '移民资讯',
    '加拿大留学',
    '住房市场',
    '汽车购买',
    '就业机会',
    '新闻动态',
    '旅游建议',
    '北径移民资讯',
    '加拿大生活',
    '移民流程',
    '留学指南',
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
  metadataBase: new URL(DOMAIN_URL),
  openGraph: {
    title,
    description,
    url: DOMAIN_URL,
    type: 'website',
    images: [`/opengraph.png`],
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
