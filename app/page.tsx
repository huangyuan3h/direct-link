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
  return (
    <main className="">
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
