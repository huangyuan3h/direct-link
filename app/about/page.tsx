import Footer from '@/components/footer';
import { Header } from '@/components/header';

import AboutIntro from './components/AboutIntro';
import OurStory from './components/OurStory';

import OurMission from './components/OurMission';
import OurTeam from './components/Team';
import { DOMAIN_URL } from '@/config/domain';
import { Metadata } from 'next';
import Title from '@/components/title';

const title = '关于我们 - North Path | 北径信息';

export async function generateMetadata(): Promise<Metadata | null> {
  return {
    title,
    description:
      '关于北径信息（North Path），专注于为移民加拿大的用户提供最新资讯和实用资源。了解我们的使命、团队和帮助新移民成功融入加拿大生活的承诺。',

    keywords: [
      '关于我们',
      '北径信息',
      'North Path',
      '加拿大移民',
      '移民服务',
      '移民资源',
      '新移民支持',
    ],
    alternates: {
      canonical: `${DOMAIN_URL}about`,
    },
  };
}

export default async function Home() {
  return (
    <main className="">
      <Header />
      <Title text={title} />
      <div className="container">
        <AboutIntro />
        <OurStory />
        <OurMission />
        <OurTeam />
      </div>

      <div className="container">
        <Footer />
      </div>
    </main>
  );
}
