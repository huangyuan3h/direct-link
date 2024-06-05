import { DOMAIN_URL } from '@/config/domain';
import { Header } from '../components/header';
import { PostList } from './pages/posts/list';
import { PostsResponse } from './pages/posts/types';
import APIClient from '@/utils/apiClient';

const getAllPosts = async (): Promise<PostsResponse> => {
  'use server';
  const client = new APIClient();
  return await client.post('/posts', {
    limit: 50,
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
    description: '为北美新移民提供生活信息、经验分享和互助平台。',
  };

  return (
    <main className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <Header />
      <PostList
        category=""
        initialPosts={data.results}
        nextToken={data.next_token}
      />
    </main>
  );
}

export const revalidate = 60;
