import { Header } from '@/components/header';
import IRCCContent from '@/app/pages/immigation/ircc';
import Footer from '@/components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '北径信息 | RCIC 验证服务 | 加拿大移民顾问认证',
  description:
    '北径信息为您提供专业的RCIC验证服务，确保您的加拿大移民顾问认证顺利进行。我们的专家团队帮助您遵循最新的移民法规，为您的移民申请提供全程支持和指导。',
  keywords: [
    '北径信息',
    'RCIC 验证服务',
    '加拿大移民顾问',
    '移民顾问认证',
    '加拿大移民',
    '移民申请',
    '移民咨询',
    '移民法规',
    '加拿大移民服务',
    '加拿大公民和移民部',
    '移民顾问资格',
    'IRCC 认证',
    '加拿大移民政策',
    '加拿大签证',
    '移民顾问查询',
    '移民法律咨询',
  ],
};

export default function RCIC() {
  return (
    <main className="">
      <Header />
      <IRCCContent />
      <Footer />
    </main>
  );
}
