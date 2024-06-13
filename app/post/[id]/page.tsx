import { PostResponseType } from '@/app/pages/posts/types';
import { View } from '@/app/pages/posts/view';
import Footer from '@/components/footer';
import { Header } from '@/components/header';
import { DOMAIN_URL } from '@/config/domain';
import APIClient from '@/utils/apiClient';
import { Metadata, ResolvingMetadata } from 'next';

interface ViewPostParamsProps {
  params: { id: string };
}

const getPostsById = async (id: string): Promise<PostResponseType> => {
  'use server';
  const client = new APIClient();
  return await client.get('/post/' + id);
};

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const p: PostResponseType = await getPostsById(id);

  const title = p.subject;
  const description = p.content.slice(0, 150);
  const keywords = p.topics.join(',');

  const images = p.images;

  return {
    title: `${title} - 北径信息`,
    description,
    keywords: keywords,
    alternates: {
      canonical: `${DOMAIN_URL}post/${id}`,
    },
    openGraph: {
      images: images,
    },
  };
}

export default async function Home({ params }: ViewPostParamsProps) {
  const posts = await getPostsById(params.id);

  // json ld

  const email = posts.email;
  const name = posts.email.slice(0, posts.email.indexOf('@'));

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${DOMAIN_URL}post/${posts.postId}`,
    },
    headline: posts.subject,
    image: posts.images,
    datePublished: posts.updatedDate,
    author: {
      '@type': 'Person',
      name: name,
      email: email,
    },
    publisher: {
      '@type': 'Organization',
      name: '北径信息',
      logo: {
        '@type': 'ImageObject',
        url: `${DOMAIN_URL}android-chrome-512x512.png`,
      },
    },
    articleBody: posts.content,
  };

  return (
    <main className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <Header />
      <View {...posts} />
      <div className="container">
        <Footer />
      </div>
    </main>
  );
}

export const revalidate = 60;
