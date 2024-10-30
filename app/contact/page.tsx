import { Header } from '@/components/header';

import Footer from '@/components/footer';
import Contact from '../pages/contact';
import { DOMAIN_URL } from '@/config/domain';
import { Metadata } from 'next';
import Title from '@/components/title';

const title = '联系我们 - North Path | 北径信息';

export async function generateMetadata(): Promise<Metadata | null> {
  return {
    title,
    description:
      '联系我们 - 如果您有关于加拿大移民的问题或需要进一步了解北径信息（North Path）的服务，请随时与我们联系。我们致力于为新移民提供全面支持和咨询服务。',
    keywords: [
      '联系我们',
      '北径信息',
      'North Path',
      '移民咨询',
      '客户支持',
      '加拿大移民帮助',
      '新移民支持',
    ],
    alternates: {
      canonical: `${DOMAIN_URL}contact`,
    },
  };
}

export default function ContactPage() {
  return (
    <main className="">
      <Header />
      <Title text={title} />
      <Contact />
      <Footer />
    </main>
  );
}
