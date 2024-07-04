import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.scss';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from '@/components/user-context';
import GoogleAnalytics from '@/components/google-analytics';
import { DOMAIN_URL } from '@/config/domain';

const san = Open_Sans({ subsets: ['latin'] });

const title = '北径信息 - 加拿大新移民一站式服务平台';
const description =
  '北径信息 - 为加拿大新移民提供全方位分类信息，涵盖移民、留学、住房、汽车、就业、新闻、旅游等，助力新移民快速融入加拿大生活。';

export const metadata: Metadata = {
  title,
  description,
  applicationName: '北径信息',
  authors: { name: 'Yuan Huang', url: 'https://github.com/huangyuan3h' },
  keywords: [
    '加拿大新移民',
    '分类信息',
    '移民',
    '留学',
    '住房',
    '租房',
    '买房',
    '汽车',
    '二手车',
    '就业',
    '新闻',
    '旅游',
    '北径信息',
    '加拿大生活',
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
