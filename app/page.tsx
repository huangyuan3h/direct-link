import { LeftMenuPanel } from '@/components/navigation/LeftMenuPanel';

import { DOMAIN_URL } from '@/config/domain';

import { Header } from '../components/header';
import { PostList } from './pages/posts/list';
import { PostsResponse } from './pages/posts/types';
import APIClient from '@/utils/apiClient';
import TopNav from '@/components/top-nav';
import { getImageUrl } from '@/utils/getImageUrl';
import { cookies } from 'next/headers';

const getAllPosts = async (): Promise<PostsResponse> => {
  'use server';
  const cookieStore = cookies();
  const authCookie = cookieStore.get('Authorization'); // the cookie is only to make sure use new data
  const client = new APIClient(authCookie?.value);
  return await client.post('/posts', {
    limit: 30,
    next_token: '',
    category: '',
  });
};

export default async function Home() {
  const data = await getAllPosts();

  // json ld

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '北径信息',
    url: DOMAIN_URL,
    description:
      '北径信息 - 为加拿大新移民提供全方位信息，涵盖移民流程、留学指南、住房市场、汽车购买、就业机会、新闻动态和旅游建议，帮助新移民融入加拿大生活。',
  };

  const articles = data.results.map((r, idx) => {
    const email = r.email;
    const name = r.email.slice(0, r.email.indexOf('@'));
    const images = r.images.map((url) => getImageUrl(url));
    return {
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Article',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${DOMAIN_URL}post/${r.postId}`,
        },
        headline: r.subject,
        image: images,
        datePublished: r.updatedDate,
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
        articleBody: r.content,
      },
    };
  });

  const listArticles = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: data.results.length,
    itemListElement: articles,
  };

  return (
    <main className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listArticles) }}
      />

      <Header v2Header />
      <div className="flex">
        <LeftMenuPanel />
        <div className="w-full">
          <TopNav />
          <PostList
            category=""
            initialPosts={data.results}
            nextToken={data.next_token}
          />
        </div>
      </div>
    </main>
  );
}

export const revalidate = 60;
