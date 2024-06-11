import { LeftMenuPanel } from '@/components/navigation/LeftMenuPanel';
import { Header } from '../components/header';
import { PostList } from './pages/posts/list';
import { PostsResponse } from './pages/posts/types';
import APIClient from '@/utils/apiClient';
import TopNav from '@/components/top-nav';

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
  return (
    <main className="">
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
